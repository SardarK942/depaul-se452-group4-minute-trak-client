import React, { useEffect, useState } from 'react';
import TimesheetForm from '../../components/timesheetPage/timesheetForm/TimesheetForm';
import TimesheetList from '../../components/timesheetPage/timesheetList/TimesheetList';
import ModalNewTimesheetForm from '../../components/common/modal/ModalNewTimesheetForm';
import { TimesheetDetail, Project, TimesheetListItem } from '../../types/timesheetTypes';
import { Button, Typography } from '@mui/material';
import styles from './TimesheetPage.module.css';

import timesheetAPI from '../../apis/timesheetAPI';
import projectAPI from '../../apis/projectAPI';
import { sortTimesheetListByAscOrder } from '../../utility/dateUtility';
import { getSessionStorage } from '../../utility/common';

interface TimeSheetProps {}

function TimesheetPage({}: TimeSheetProps) {
  const [isModalOn, setModal] = useState<boolean>(false);
  const [timesheetList, setTimesheetList] = useState<TimesheetListItem[]>([]);
  const [timesheetDetail, setTimesheetDetail] = useState<TimesheetDetail | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);

  /* fetch data */
  useEffect(() => {
    (async () => {
      const timesheetListData = sortTimesheetListByAscOrder(await getTimesheetListData());
      const timesheetDetail = await getTimesheetDetail(timesheetListData[0].tid);
      const projectsData = await getProjectListData();
      setTimesheetList(timesheetListData);
      setTimesheetDetail(timesheetDetail);
      setProjects(projectsData);
    })();
  }, []);

  function getProjectListData(): Promise<Project[]> {
    const data = projectAPI
      .get('/list')
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function getTimesheetListData(): Promise<TimesheetListItem[]> {
    const data = timesheetAPI
      .get('/list')
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function getTimesheetDetail(tid: number): Promise<TimesheetDetail> {
    const data = timesheetAPI
      .get(`/${tid}`)
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function handleSubmitForm(timesheetDetail: TimesheetDetail) {
    timesheetAPI
      .post(`/submit`, {
        ...timesheetDetail,
      })
      .then(() => {
        alert('submitted');
        const newTimesheetList = [...timesheetList];
        const targetItem = newTimesheetList.filter((item) => item.tid === timesheetDetail.tid)[0];
        targetItem.submitted = true;
        setTimesheetList(newTimesheetList);
        (async () => {
          setTimesheetDetail(await getTimesheetDetail(timesheetDetail.tid));
        })();
      })
      .catch((e) => alert(e));
  }

  function handleClickListItem(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    (async () => {
      setTimesheetDetail(await getTimesheetDetail(Number(e.currentTarget.id)));
    })();
  }

  async function handleCreateNewTimesheetForm(startDate: string, endDate: string) {
    try {
      const {
        data: { tid },
      } = await timesheetAPI.post('/new', {
        startDate,
        endDate,
      });
      alert('Created a new timesheet');

      const newTimesheetListItem: TimesheetListItem = {
        tid,
        startDate,
        endDate,
        submitted: false,
        approved: false,
        rejected: false,
      };
      setTimesheetList([newTimesheetListItem, ...timesheetList]);
      (async () => {
        setTimesheetDetail(await getTimesheetDetail(newTimesheetListItem.tid));
      })();
      //
    } catch (err) {
      alert(err); // TODO
    } finally {
      setModal(false);
    }
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
          <Typography variant="h6">{`${getSessionStorage('name')} (${getSessionStorage('email')})`}</Typography>
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <Button
              onClick={() => setModal(true)}
              variant="outlined"
              color="primary"
              sx={{ height: '4rem', fontSize: '1.25rem', marginBottom: '1rem' }}
            >
              New Timesheet
            </Button>
            <TimesheetList data={timesheetList} handleClickListItem={handleClickListItem} />
          </div>
          <div className={styles.content}>
            {timesheetDetail && (
              <TimesheetForm data={timesheetDetail} projects={projects} handleSubmit={handleSubmitForm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimesheetPage;
