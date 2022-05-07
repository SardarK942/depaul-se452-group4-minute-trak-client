import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export function parseISODateStringToDate(date: string): Date {
  return parse(date, 'yyyy-MM-dd', new Date());
}

export function convertDateToISODateString(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

export function convertDateStringToISODateString(date: string): string {
  return convertDateToISODateString(new Date(date));
}

export function addDaysToISODateString(date: string, days: number): string {
  return convertDateToISODateString(addDays(new Date(date), days));
}
