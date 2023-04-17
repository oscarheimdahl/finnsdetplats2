import { Day } from '../providers/app-state';

export function getWeek(date: Date = new Date()): Day[] {
  if (date.getDay() === 0) date.setDate(date.getDate() - 7);
  else date.setDate(date.getDate() - date.getDay());

  let week: Day[] = [];
  for (let i = 0; i < 7; i++) {
    const next = new Date(date);
    next.setDate(date.getDate() + i + 1);
    week = [...week, { date: parseFullDate(next) }];
  }
  return week;
}

export function lastWeek(d: string): Day[] {
  const date = new Date(d);
  date.setDate(date.getDate() - 1);
  return getWeek(date);
}

export function nextWeek(d: string): Day[] {
  const date = new Date(d);
  date.setDate(date.getDate() + 1);
  return getWeek(date);
}

export function isToday(d: string): boolean {
  const date = new Date(d);
  const today = new Date(Date.now());
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
    return true;
  return false;
}

export function hasPassed(d: string): boolean {
  const date = new Date(d);
  const today = new Date(Date.now());
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  if (today.toISOString() > date.toISOString()) return true;
  return false;
}

export function isWeekend(d: string): boolean {
  const date = new Date(d);
  if (date.getDay() === 0 || date.getDay() === 6) return true;
  return false;
}

export function parseFullDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() < 9 ? '0' : '') + (Number(date.getMonth()) + 1);
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  return `${yyyy}-${mm}-${dd}`;
}

export function parseDate(d: string): number {
  const date = new Date(d);
  return date.getDate();
}

export function parseDay(d: string): string {
  const date = new Date(d);
  switch (date.getDay()) {
    case 1:
      return 'måndag';
    case 2:
      return 'tisdag';
    case 3:
      return 'onsdag';
    case 4:
      return 'torsdag';
    case 5:
      return 'fredag';
    case 6:
      return 'lördag';
    default:
      return 'söndag';
  }
}

export function parseMonth(d: string): string {
  const date = new Date(d);
  switch (date.getMonth()) {
    case 1:
      return 'februari';
    case 2:
      return 'mars';
    case 3:
      return 'april';
    case 4:
      return 'maj';
    case 5:
      return 'juni';
    case 6:
      return 'juli';
    case 7:
      return 'augusti';
    case 8:
      return 'september';
    case 9:
      return 'oktober';
    case 10:
      return 'november';
    case 11:
      return 'december';
    default:
      return 'januari';
  }
}
