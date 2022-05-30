/* Fetch Project[] type data from the server. to render dropdown menu items for selecting projects */
export interface Project {
  pid: number;
  name: string;
}

export type TimeoffsheetListData = TimeoffsheetListItem[];

export interface TimeoffsheetListItem {
  rid: number;
  startDate: string;
  endDate: string;
  isApproved: boolean;
  isPaid: boolean;
  eid: number;
}
/* Timesheet List */
export type TimesheetListData = TimesheetListItem[];

export interface TimesheetListItem {
  tid: number;
  startDate: string;
  endDate: string;
  submitted: boolean;
  approved: boolean;
  rejected: boolean;
}

/* Timesheet Content */
export interface TimesheetDetail {
  tid: number;
  startDate: string;
  endDate: string;
  submitted: boolean;
  approved: boolean;
  rejected: boolean;
  pto: PTO;
  works: Work[];
}

export interface Work {
  pid: number;
  name: string;
  hours: Hours;
}

export interface PTO {
  hours: Hours;
}

export interface Hours {
  [date: string]: number;
}

export interface Column {
  prop: string;
  label: string;
}
