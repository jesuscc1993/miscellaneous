const TIME_DIGIT_LENGTH = 2;
const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * DAYS_IN_WEEK;

let items = [];

const initFromConfig = async () => {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch config');
    const config = await res.json();
    for (const group of config) {
      for (const child of group.children) {
        items.push({ ...child, parent: group.name });
      }
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

  const groups = new Map();
  for (const item of items) {
    const id = getIdFromName(item.parent + ' ' + item.name);
    item.id = id;
    const parent = item.parent || item.name;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(item);
  }

  for (const [parentName, children] of groups) {
    const parentId = getIdFromName(parentName) || 'parent';
    const section = document.createElement('section');
    section.className = 'card';
    section.setAttribute('aria-labelledby', parentId + 'Label');

    const title = document.createElement('strong');
    title.id = parentId + 'Label';
    title.className = 'label text-125';
    title.textContent = parentName;
    section.appendChild(title);

    for (const child of children) {
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

      section.appendChild(row);
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
