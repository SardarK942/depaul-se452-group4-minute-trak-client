import { TimesheetListItem } from './../types/timesheetTypes';
import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import parse from 'date-fns/parse';

import compareDesc from 'date-fns/compareDesc';
import parseISO from 'date-fns/parseISO';

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

export function sortTimesheetListByAscOrder(timesheetList: TimesheetListItem[]) {
  return timesheetList.sort((a, b) => compareDesc(parseISO(a.startDate), parseISO(b.startDate)));
}
