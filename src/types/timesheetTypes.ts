/* Fetch Project[] type data from the server. to render dropdown menu items for selecting projects */
export interface Project {
  pid: number;
  name: string;
}

export type AdminTimeoffsheetListData = AdminTimeoffsheetListItem[];

export interface AdminTimeoffsheetListItem {
  rid: number;
  startDate: string;
  endDate: string;
  isApproved: boolean;
  isPaid: boolean;
  employee: Employee;
}


export interface Employee {
  email: String;
  id: number;
  password: String;
  firstName: String;
  lastName: String;
  phone: String;
  dob: Date;
  address: String;
  createdTime: Date;
  isApproved: boolean;
  isRejected: boolean;
  ptoBank: number
}
/* Timesheet List */
export type TimesheetListData = TimesheetListItem[];
export type AdminTimesheetListData = AdminTimesheetListItem[];


export interface AdminTimesheetListItem {
  tid: number;
  startDate: string;
  endDate: string;
  submitted: boolean;
  approved: boolean;
  rejected: boolean;
  employee: Employee;
}

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
