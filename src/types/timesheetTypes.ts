/* Fetch Project[] type data from the server. to render dropdown menu items for selecting projects */
export interface Project {
  pId: number;
  projectName: string;
}

/* Timesheet List */
export type TimesheetListData = TimesheetListItem[];

export interface TimesheetListItem {
  tId: number;
  startDate: string;
  endDate: string;
  isSubmitted: boolean;
  isApproved: boolean;
}

/* Timesheet Content */
export interface TimesheetDetail {
  tId: number;
  startDate: string;
  endDate: string;
  isSubmitted: boolean;
  isApproved: boolean;
  pto: PTO;
  works: Work[];
}

export interface Work {
  pId: number;
  projectName: string;
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
