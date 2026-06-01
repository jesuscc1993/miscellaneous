(() => {
  const CRON_FIELD_COUNT = 5;
  const STEP_MINUTES = 60;
  const MAX_SEARCH_MINUTES = 54720; // 31 + 7 days

  const MINUTE_MIN = 0;
  const MINUTE_MAX = 59;
  const HOUR_MIN = 0;
  const HOUR_MAX = 23;
  const DAY_MIN = 1;
  const DAY_MAX = 31;
  const MONTH_MIN = 1;
  const MONTH_MAX = 12;
  const WEEKDAY_MIN = 0;
  const WEEKDAY_MAX = 6;

  const cronCache = new Map();

  const parseCronField = (field, minValue, maxValue) => {
    if (field === '*') return null;
    const rawSegments = field.split(',');
    const allowedValues = new Set();
    for (const segment of rawSegments) {
      if (segment.includes('-')) {
        const [rangeStart, rangeEnd] = segment.split('-').map(Number);
        for (let value = rangeStart; value <= rangeEnd; value++) {
          if (value < minValue || value > maxValue) continue;
          allowedValues.add(value);
        }
      } else {
        const value = Number(segment);
        if (value < minValue || value > maxValue) continue;
        allowedValues.add(value);
      }
    }
    return allowedValues;
  };

  const parseCron = (cronStr) => {
    if (cronCache.has(cronStr)) return cronCache.get(cronStr);
    const parts = cronStr.trim().split(/\s+/);
    if (parts.length !== CRON_FIELD_COUNT)
      throw new Error('Invalid cron: ' + cronStr);
    const [minuteField, hourField, dayField, monthField, weekdayField] = parts;
    const cron = {
      minute: parseCronField(minuteField, MINUTE_MIN, MINUTE_MAX),
      hour: parseCronField(hourField, HOUR_MIN, HOUR_MAX),
      day: parseCronField(dayField, DAY_MIN, DAY_MAX),
      month: parseCronField(monthField, MONTH_MIN, MONTH_MAX),
      weekday: parseCronField(weekdayField, WEEKDAY_MIN, WEEKDAY_MAX),
    };
    cronCache.set(cronStr, cron);
    return cron;
  };

  const matchCronDateUTC = (date, cronObj) => {
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const weekday = date.getUTCDay();
    if (cronObj.minute && !cronObj.minute.has(minutes)) return false;
    if (cronObj.hour && !cronObj.hour.has(hours)) return false;
    if (cronObj.day && !cronObj.day.has(day)) return false;
    if (cronObj.month && !cronObj.month.has(month)) return false;
    if (cronObj.weekday && !cronObj.weekday.has(weekday)) return false;
    return true;
  };

  const nextFromCron = (
    now,
    cronStr,
    maxSearchMinutes = MAX_SEARCH_MINUTES,
  ) => {
    const cron = parseCron(cronStr);
    const date = new Date(now.getTime());
    date.setUTCSeconds(0, 0);
    const remainder = date.getUTCMinutes() % STEP_MINUTES;
    const minutesToNextStep =
      remainder === 0 ? STEP_MINUTES : STEP_MINUTES - remainder;
    date.setUTCMinutes(date.getUTCMinutes() + minutesToNextStep);
    const maxSteps = Math.ceil(maxSearchMinutes / STEP_MINUTES);
    for (let i = 0; i < maxSteps; i++) {
      if (matchCronDateUTC(date, cron)) return date;
      date.setUTCMinutes(date.getUTCMinutes() + STEP_MINUTES);
    }
    return null;
  };

  window.nextFromCron = nextFromCron;
})();
