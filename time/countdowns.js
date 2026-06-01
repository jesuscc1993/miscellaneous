const _cronCache = new Map();
let items = [];

async function initFromConfig() {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch config');
    items = await res.json();
  } catch (err) {
    console.warn('Using default items; could not load config.json', err);
    items = defaultItems;
  }
  appendItems();
  updateItems();
  setInterval(updateItems, 1000);
}

function idFromName(name) {
  const parts = name
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/);
  if (!parts.length) return '';
  return parts
    .map((p, i) =>
      i === 0
        ? p.charAt(0).toLowerCase() + p.slice(1)
        : p.charAt(0).toUpperCase() + p.slice(1),
    )
    .join('');
}

function renderItems() {
  const container = document.getElementById('itemsContainer');
  if (!container) return;
  container.innerHTML = '';
  for (const item of items) {
    const id = getIdFromName(item.name);
    item.id = id;
    const section = document.createElement('section');
    section.className = 'card';
    section.setAttribute('aria-labelledby', id + 'Label');

    const left = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.id = id + 'Label';
    h2.className = 'label';
    h2.textContent = item.name;
    const p = document.createElement('p');
    p.className = 'meta';
    p.textContent = item.description;
    left.appendChild(h2);
    left.appendChild(p);

    const timeEl = document.createElement('time');
    timeEl.id = id;
    timeEl.className = 'time';
    timeEl.setAttribute('datetime', '');
    timeEl.setAttribute('aria-live', 'polite');
    timeEl.setAttribute('aria-atomic', 'true');
    timeEl.textContent = '--:--:--';

    section.appendChild(left);
    section.appendChild(timeEl);
    container.appendChild(section);
  }
}

function parseCronField(field, min, max) {
  if (field === '*') return null;
  const parts = field.split(',');
  const set = new Set();
  for (const p of parts) {
    if (p.includes('-')) {
      const [a, b] = p.split('-').map(Number);
      for (let v = a; v <= b; v++) set.add(v);
    } else {
      set.add(Number(p));
    }
  }
  return set;
}

function parseCron(cronStr) {
  if (_cronCache.has(cronStr)) return _cronCache.get(cronStr);
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error('Invalid cron: ' + cronStr);
  const [minF, hourF, dayF, monthF, weekdayF] = parts;
  const obj = {
    minute: parseCronField(minF, 0, 59),
    hour: parseCronField(hourF, 0, 23),
    day: parseCronField(dayF, 1, 31),
    month: parseCronField(monthF, 1, 12),
    weekday: parseCronField(weekdayF, 0, 6),
  };
  _cronCache.set(cronStr, obj);
  return obj;
}

function matchCronDateUTC(dt, cronObj) {
  const m = dt.getUTCMinutes();
  const h = dt.getUTCHours();
  const d = dt.getUTCDate();
  const mo = dt.getUTCMonth() + 1;
  const w = dt.getUTCDay();
  if (cronObj.minute && !cronObj.minute.has(m)) return false;
  if (cronObj.hour && !cronObj.hour.has(h)) return false;
  if (cronObj.day && !cronObj.day.has(d)) return false;
  if (cronObj.month && !cronObj.month.has(mo)) return false;
  if (cronObj.weekday && !cronObj.weekday.has(w)) return false;
  return true;
}

function nextFromCron(now, cronStr, maxSearchMinutes = 525600) {
  const cronObj = parseCron(cronStr);
  const candidate = new Date(now.getTime());
  candidate.setUTCSeconds(0, 0);
  candidate.setUTCMinutes(candidate.getUTCMinutes() + 1);
  for (let i = 0; i < maxSearchMinutes; i++) {
    if (matchCronDateUTC(candidate, cronObj)) return candidate;
    candidate.setUTCMinutes(candidate.getUTCMinutes() + 1);
  }
  return null;
}

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function formatRemaining(ms) {
  if (ms <= 0) return '00d 00:00:00';
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  const time = padStart(hours) + ':' + padStart(mins) + ':' + padStart(secs);
  return (days ? days + 'd ' : '') + time;
}

function update() {
  const now = new Date();
  const nowMs = Date.now();
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const target = nextFromCron(now, item.cron);
    if (!target) continue;
    el.textContent = formatRemaining(target.getTime() - nowMs);
    el.setAttribute('datetime', target.toISOString());
  }
}

initFromConfig();
