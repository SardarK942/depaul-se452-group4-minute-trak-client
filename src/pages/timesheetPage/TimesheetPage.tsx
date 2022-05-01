import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TimesheetForm from '../../components/timesheetPage/timesheetForm/TimesheetForm';
import TimesheetList from '../../components/timesheetPage/timesheetList/TimesheetList';
import { TimesheetListData, TimesheetDetail, Project } from '../../types/timesheetTypes';
import styles from './TimesheetPage.module.css';

import { fakeProjects, fakeTimesheetDetail, fakeTimesheetList } from './FAKE_DATA';

interface TimeSheetProps {}

function TimesheetPage({}: TimeSheetProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [timesheetList, setTimesheetList] = useState<TimesheetListData | null>(null);
  const [timesheetDetail, setTimesheetDetail] = useState<TimesheetDetail | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);

  /* fetch data */
  useEffect(() => {
    setTimesheetList(fakeTimesheetList);
    setProjects(fakeProjects);
    setSelectedId(fakeTimesheetList[0].tId);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    /* TO DO -  when user selects any list item, fetch timesheet detail data from the server */
    setTimesheetDetail({ ...fakeTimesheetDetail[selectedId] });
  }, [selectedId]);

  function handleClickListItem(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    setSelectedId(Number(e.currentTarget.id));
  }

  function handleSubmitForm() {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Timesheet
        </Typography>
        <Typography variant="h6">John Doe (abhsajkd@asdf.com)</Typography>
      </div>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <TimesheetList data={timesheetList} handleClickListItem={handleClickListItem} />
        </div>
        <div className={styles.content}>
          {timesheetDetail && <TimesheetForm tId={selectedId} data={timesheetDetail} projects={projects} />}
        </div>
      </div>
    </div>
  );
}

export default TimesheetPage;
