const TIME_DIGIT_LENGTH = 2;
const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * DAYS_IN_WEEK;

const COLORIZATION_THRESHOLDS = [
  { min: 0.75, color: 'green' },
  { min: 0.5, color: 'orange' },
  { min: 0.25, color: 'yellow' },
  { min: 0, color: 'red' },
];

let items;
let groups;

const initFromConfig = async () => {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch config');
    const config = await res.json();

    items = [];
    groups = [];

    for (const group of config) {
      const children = [];

      for (const child of group.children ?? []) {
        const item = {
          ...child,
          parent: group.name,
          id: getIdFromName(group.name + ' ' + child.name),
        };
        children.push(item);
        items.push(item);
      }

      groups.push({
        ...group,
        id: getIdFromName(group.name) || 'parent',
        children,
      });
    }
  } catch (err) {
    console.error('Could not load config.json', err);
  }

  appendItems();
  updateItems();
  setInterval(updateItems, MS_IN_SECOND);
};

const getIdFromName = (name) =>
  name
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/)
    .map((part, i) =>
      i
        ? part[0]?.toUpperCase() + part.slice(1)
        : part[0]?.toLowerCase() + part.slice(1),
    )
    .join('');

const appendItems = () => {
  const container = document.getElementById('itemsContainer');

  for (const group of groups) {
    const section = document.createElement('section');
    section.className = 'card';
    section.setAttribute('aria-labelledby', group.id + 'Label');

    if (group.icon) {
      const icon = document.createElement('img');
      icon.classList.add('icon');
      if (group.iconClass) {
        icon.classList.add(group.iconClass);
      }
      icon.src = group.icon;
      icon.alt = group.name + ' icon';
      section.appendChild(icon);
    }

    const right = document.createElement('section');
    right.className = 'right';
    right.setAttribute('aria-labelledby', group.id + 'Label');

    const title = document.createElement('strong');
    title.id = group.id + 'Label';
    title.className = 'label text-125';
    title.textContent = group.name;
    right.appendChild(title);

    for (const child of group.children) {
      const row = document.createElement('p');
      row.className = 'row';

      const name = document.createElement('span');
      name.textContent = child.name;

      const nameWrapper = document.createElement('div');
      nameWrapper.appendChild(name);

      if (child.links?.length > 1) {
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.className = 'plain';
        anchor.target = '_blank';
        anchor.onclick = (e) => {
          e.preventDefault();

          for (const link of child.links) {
            window.open(link.href, link.name ?? '_blank');
          }
        };
        anchor.appendChild(name);
        nameWrapper.appendChild(anchor);

        nameWrapper.appendChild(document.createTextNode(' ('));

        for (let i = 0; i < child.links.length; i++) {
          const link = child.links[i];
          const childAnchor = document.createElement('a');
          childAnchor.href = link.href;
          childAnchor.textContent = (link.name ?? '') + '🔗';
          childAnchor.target = '_blank';
          nameWrapper.appendChild(childAnchor);

          if (i < child.links.length - 1) {
            nameWrapper.appendChild(document.createTextNode(' | '));
          }
        }

        nameWrapper.appendChild(document.createTextNode(')'));
        row.appendChild(nameWrapper);
      } else if (child.links?.length === 1) {
        nameWrapper.textContent += '🔗';

        const link = child.links[0];
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'plain';
        anchor.target = '_blank';
        anchor.appendChild(nameWrapper);
        row.appendChild(anchor);
      } else {
        row.appendChild(nameWrapper);
      }

      const line = document.createElement('div');
      line.className = 'line';
      row.appendChild(line);

      const timeEl = document.createElement('time');
      timeEl.id = child.id;
      timeEl.className = 'time text-125';
      timeEl.textContent = '--:--:--';
      timeEl.setAttribute('datetime', '');
      timeEl.setAttribute('aria-live', 'polite');
      timeEl.setAttribute('aria-atomic', 'true');
      row.appendChild(timeEl);

      right.appendChild(row);
      section.appendChild(right);
    }

    container.appendChild(section);
  }
};

const padStart = (n, length = TIME_DIGIT_LENGTH) => {
  return n.toString().padStart(length, '0');
};

const formatRemaining = (ms) => {
  const remaining = Math.max(0, Math.ceil(ms / MS_IN_SECOND));
  const weeks = Math.floor(remaining / SECONDS_IN_WEEK);
  const days = Math.floor((remaining % SECONDS_IN_WEEK) / SECONDS_IN_DAY);
  const hours = Math.floor((remaining % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
  const minutes = Math.floor((remaining % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = remaining % SECONDS_IN_MINUTE;
  return (
    (weeks ? weeks + 'w ' : '') +
    (weeks || days ? days + 'd ' : '') +
    (padStart(hours) + ':' + padStart(minutes) + ':' + padStart(seconds))
  );
};

const getColorForRatio = (ratio, ascending) => {
  const r = ascending ? 1 - ratio : ratio;
  for (const { min, color } of COLORIZATION_THRESHOLDS) {
    if (r >= min) return color;
  }
  return COLORIZATION_THRESHOLDS[COLORIZATION_THRESHOLDS.length - 1].color;
};

const updateItems = () => {
  const now = new Date();
  const nowInMs = Date.now();
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const target = nextFromCron(now, item.cron);
    if (!target) continue;
    const timeLeft = target.getTime() - nowInMs;
    el.textContent = formatRemaining(timeLeft);
    el.setAttribute('datetime', target.toISOString());

    if (item.colorize) {
      const nextTarget = nextFromCron(target, item.cron);
      if (nextTarget) {
        const periodicity = nextTarget.getTime() - target.getTime();
        const color = getColorForRatio(
          timeLeft / periodicity,
          item.colorize === 'ASC',
        );
        el.classList.remove('fg-red', 'fg-yellow', 'fg-green', 'fg-white');
        if (color) el.classList.add('fg-' + color);
      }
    }
  }
};

initFromConfig();
