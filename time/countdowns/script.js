const TIME_PAD_LENGTH = 2;
const UPDATE_INTERVAL_MS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY;

let items = [];

const initFromConfig = async () => {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch config');
    const raw = await res.json();
    if (Array.isArray(raw)) {
      for (const entry of raw) {
        const parentName = entry.name || entry.title || '';
        if (Array.isArray(entry.children) && entry.children.length) {
          for (const child of entry.children) {
            const childName = child.name ?? child.description ?? parentName;
            items.push({
              parent: parentName,
              name: childName,
              cron: child.cron,
            });
          }
        } else if (entry.cron) {
          const childName = entry.description ?? entry.name ?? parentName;
          items.push({
            parent: parentName,
            name: childName,
            cron: entry.cron,
          });
        }
      }
    }
  } catch (err) {
    console.error('Could not load config.json', err);
  }

  appendItems();
  updateItems();
  setInterval(updateItems, UPDATE_INTERVAL_MS);
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

const padStart = (n, length = TIME_PAD_LENGTH) => {
  return n.toString().padStart(length, '0');
};

const formatRemaining = (ms) => {
  const remaining = Math.floor(ms / 1000);
  const days = Math.floor(remaining / SECONDS_IN_DAY);
  const hours = Math.floor((remaining % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
  const minutes = Math.floor((remaining % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = remaining % SECONDS_IN_MINUTE;
  return (
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
