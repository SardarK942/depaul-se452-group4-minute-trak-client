import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TimesheetForm from '../../components/timesheetPage/timesheetForm/TimesheetForm';
import TimesheetList from '../../components/timesheetPage/timesheetList/TimesheetList';
import { TimesheetDetail, Project, TimesheetListItem } from '../../types/timesheetTypes';
import styles from './TimesheetPage.module.css';

import { fakeProjects, fakeTimesheetDetail, fakeTimesheetList } from './FAKE_DATA';
import ModalNewTimesheetForm from '../../components/common/modal/ModalNewTimesheetForm';

interface TimeSheetProps {}

function TimesheetPage({}: TimeSheetProps) {
  const [isModalOn, setModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [timesheetList, setTimesheetList] = useState<TimesheetListItem[]>([]);
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

  function handleSubmitForm() {
    alert('TODO');
  }

  function handleCreateNewTimesheetForm(startDate: string, endDate: string) {
    /* TODO - create new form */
    alert('TODO');
    setModal(false);
  }

  return (
    <>
      {isModalOn && (
        <ModalNewTimesheetForm handleClose={() => setModal(false)} handleSubmit={handleCreateNewTimesheetForm} />
      )}
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Timesheet
          </Typography>
          <Typography variant="h6">John Doe (abhsajkd@asdf.com)</Typography>
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <TimesheetList data={timesheetList} handleClickListItem={handleClickListItem} />{' '}
            <Button onClick={() => setModal(true)} variant="contained" sx={{ height: '4rem', fontSize: '1.25rem' }}>
              New Timesheet
            </Button>
          </div>
          <div className={styles.content}>
            {timesheetDetail && (
              <TimesheetForm
                tId={selectedId}
                data={timesheetDetail}
                projects={projects}
                handleSubmit={handleSubmitForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimesheetPage;
