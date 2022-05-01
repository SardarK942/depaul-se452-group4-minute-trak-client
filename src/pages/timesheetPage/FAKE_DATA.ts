import { Project, TimesheetDetail, TimesheetListData } from './../../types/timesheetTypes';

export const fakeProjects: Project[] = [
  { pId: 1, projectName: 'Project A' },
  { pId: 2, projectName: 'Project B' },
  { pId: 3, projectName: 'Project C' },
  { pId: 4, projectName: 'Project D' },
  { pId: 5, projectName: 'Project E' },
  { pId: 6, projectName: 'Project F' },
];

export const fakeTimesheetList: TimesheetListData = [
  {
    tId: 14,
    startDate: '2022-04-01',
    endDate: '2022-04-14',
    isSubmitted: false,
    isApproved: false,
  },
  {
    tId: 13,
    startDate: '2022-03-04',
    endDate: '2022-03-17',
    isSubmitted: true,
    isApproved: false,
  },
  {
    tId: 12,
    startDate: '2022-02-18',
    endDate: '2022-03-03',
    isSubmitted: true,
    isApproved: true,
  },
  {
    tId: 11,
    startDate: '2022-02-04',
    endDate: '2022-02-17',
    isSubmitted: true,
    isApproved: true,
  },
];

export const fakeTimesheetDetail: { [index: number | string]: TimesheetDetail } = {
  11: {
    tId: 11,
    startDate: '2022-02-04',
    endDate: '2022-02-17',
    isSubmitted: true,
    isApproved: true,
    pto: {
      hours: {
        '2022-02-14': 8,
      },
    },
    works: [
      {
        pId: 1,
        projectName: 'Project A',
        hours: {
          '2022-02-04': 8,
          '2022-02-05': 8,
          '2022-02-06': 8,
          '2022-02-07': 8,
          '2022-02-13': 4,
          '2022-02-15': 4,
        },
      },
      {
        pId: 2,
        projectName: 'Project B',
        hours: {
          '2022-02-08': 8,
          '2022-02-11': 8,
          '2022-02-12': 8,
        },
      },
      {
        pId: 3,
        projectName: 'Project C',
        hours: {
          '2022-02-13': 4,
          '2022-02-15': 4,
        },
      },
    ],
  },
  12: {
    tId: 12,
    startDate: '2022-02-18',
    endDate: '2022-03-03',
    isSubmitted: true,
    isApproved: true,
    pto: {
      hours: {
        '2022-02-18': 8,
        '2022-02-19': 8,
      },
    },
    works: [
      {
        pId: 1,
        projectName: 'Project A',
        hours: {
          '2022-02-20': 5,
          '2022-02-21': 5,
          '2022-02-22': 5,
          '2022-02-25': 5,
          '2022-02-26': 5,
          '2022-02-27': 8,
          '2022-02-28': 8,
          '2022-03-01': 8,
        },
      },
      {
        pId: 2,
        projectName: 'Project B',
        hours: {
          '2022-02-20': 2,
          '2022-02-21': 2,
          '2022-02-22': 2,
          '2022-02-25': 2,
          '2022-02-26': 2,
        },
      },
      {
        pId: 3,
        projectName: 'Project C',
        hours: {
          '2022-02-20': 1,
          '2022-02-21': 1,
          '2022-02-22': 1,
          '2022-02-25': 1,
          '2022-02-26': 1,
        },
      },
    ],
  },
  13: {
    tId: 13,
    startDate: '2022-03-04',
    endDate: '2022-03-17',
    isSubmitted: true,
    isApproved: false,
    pto: {
      hours: {},
    },
    works: [
      {
        pId: 1,
        projectName: 'Project A',
        hours: {
          '2022-03-04': 8,
          '2022-03-05': 8,
          '2022-03-06': 8,
          '2022-03-07': 8,
          '2022-03-08': 8,
          '2022-03-11': 8,
        },
      },
      {
        pId: 2,
        projectName: 'Project B',
        hours: {
          '2022-03-12': 8,
          '2022-03-13': 8,
          '2022-03-14': 8,
          '2022-03-15': 8,
        },
      },
    ],
  },
  14: {
    tId: 14,
    startDate: '2022-04-01',
    endDate: '2022-04-14',
    isSubmitted: false,
    isApproved: false,
    works: [],
    pto: {
      hours: {
        '2022-04-04': 8,
        '2022-04-05': 8,
        '2022-04-06': 8,
        '2022-04-07': 8,
        '2022-04-08': 8,
      },
    },
  },
};
