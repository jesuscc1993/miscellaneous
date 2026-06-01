const TIME_DIGIT_LENGTH = 2;
const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * DAYS_IN_WEEK;

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
        name: group.name,
        id: getIdFromName(group.name) || 'parent',
        icon: group.icon,
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
      icon.className = 'icon';
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

      const name = document.createElement('div');
      name.textContent = child.name;

      if (child.links) {
        name.appendChild(document.createTextNode(' ('));

        for (let i = 0; i < child.links.length; i++) {
          const link = child.links[i];
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = (link.name ?? '') + '🔗';
          anchor.className = 'plain';
          anchor.target = '_blank';
          name.appendChild(anchor);

          if (i < child.links.length - 1) {
            name.appendChild(document.createTextNode(' | '));
          }
        }

        name.appendChild(document.createTextNode(')'));
      }

      row.appendChild(name);

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
  const remaining = Math.max(0, Math.floor(ms / MS_IN_SECOND));
  const weeks = Math.floor(remaining / SECONDS_IN_WEEK);
  const days = Math.floor((remaining % SECONDS_IN_WEEK) / SECONDS_IN_DAY);
  const hours = Math.floor((remaining % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
  const minutes = Math.floor((remaining % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = remaining % SECONDS_IN_MINUTE;
  return (
    (weeks ? weeks + 'w ' : '') +
    (days ? days + 'd ' : '') +
    (padStart(hours) + ':' + padStart(minutes) + ':' + padStart(seconds))
  );
};

const updateItems = () => {
  const now = new Date();
  const nowInMs = Date.now();
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const target = nextFromCron(now, item.cron);
    if (!target) continue;
    el.textContent = formatRemaining(target.getTime() - nowInMs);
    el.setAttribute('datetime', target.toISOString());
  }
};

initFromConfig();
