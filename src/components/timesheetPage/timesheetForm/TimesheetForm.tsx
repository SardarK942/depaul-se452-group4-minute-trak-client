import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Column, Project, TimesheetDetail, Work } from '../../../types/timesheetTypes';
import { ApprovedTag, SubmittedTag } from '../../common/tag/Tag';
import TdSelectHour from '../tdSelectHour/TdSelectHour';

import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import styles from './TimesheetForm.module.css';
import ModalSelect from '../../common/modal/ModalSelect';

interface TimesheetFormProps {
  tId: number | null;
  data: TimesheetDetail;
  projects: Project[] | null;
}

function TimesheetForm({ data, tId, projects }: TimesheetFormProps) {
  const [timesheetDetail, setTimesheetDetail] = useState<TimesheetDetail>(data);
  const [isModalOn, setModal] = useState<boolean>(false);

  useEffect(() => {
    setTimesheetDetail(data);
  }, [data]);

  function handleChangeHourSelect(index: number, prop: string, newValue: number): void {
    const newWorks: Work[] = [...timesheetDetail.works];
    newWorks[index].hours[prop] = newValue;
    setTimesheetDetail({ ...timesheetDetail, works: newWorks });
  }

  function handleDeleteRow(pId: number): void {
    const newWorks: Work[] = [...timesheetDetail.works].filter((work) => work.pId !== pId);
    setTimesheetDetail({ ...timesheetDetail, works: newWorks });
  }

  function getProjectName(pId: number): string {
    return projects!.filter((project) => project.pId === pId)[0].projectName;
  }

  function handleAddRow(pId: number): void {
    const newWork: Work = {
      pId,
      projectName: getProjectName(pId),
      hours: {},
    };
    setTimesheetDetail({ ...timesheetDetail, works: [...timesheetDetail.works, newWork] });
  }

  function generateColumns(data: TimesheetDetail): Column[] {
    const result: Column[] = [];
    if (!data) return result;
    const startDate: Date = parse(data.startDate, 'yyyy-MM-dd', new Date());
    const endDate: Date = parse(data.endDate, 'yyyy-MM-dd', new Date());

    let curr: Date = startDate;
    while (isBefore(curr, endDate)) {
      const column: Column = {
        prop: formatISO(curr, { representation: 'date' }),
        label: format(curr, 'MM/dd'),
      };
      result.push(column);
      curr = addDays(curr, 1);
    }
    // Include end date
    result.push({
      prop: formatISO(curr, { representation: 'date' }),
      label: format(curr, 'MM/dd'),
    });

    return result;
  }

  return (
    <>
      {isModalOn && (
        <ModalSelect
          projects={projects}
          works={timesheetDetail?.works}
          setModal={setModal}
          handleAddRow={handleAddRow}
        />
      )}
      <div className={styles.form}>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {`${timesheetDetail.startDate} ~ ${timesheetDetail.endDate}`}
          </Typography>
          <SubmittedTag isOn={timesheetDetail.isSubmitted} style={{ padding: '0.5rem 1rem' }} />
          <ApprovedTag isOn={timesheetDetail.isApproved} style={{ marginLeft: '0.25rem', padding: '0.5rem 1rem' }} />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '20rem' }} key="projectName">
                Project
              </th>
              {generateColumns(timesheetDetail).map((column) => (
                <th key={column.prop}>{column.label}</th>
              ))}
              {!timesheetDetail.isSubmitted && <th>Remove</th>}
            </tr>
          </thead>

          <tbody>
            {/* RENDER PTO */}
            <tr className={styles.pto_tr}>
              <td>PTO</td>
              {generateColumns(timesheetDetail).map((column) => (
                <td id={column.prop}>{timesheetDetail.pto.hours[column.prop]}</td>
              ))}
              {!timesheetDetail.isSubmitted && <td></td>}
            </tr>

            {/* RENDER WORK HOURS */}
            {timesheetDetail.works.map((work, idx) => (
              <tr key={work.pId}>
                <td>{getProjectName(work.pId)}</td>
                {generateColumns(timesheetDetail).map((column) => (
                  <TdSelectHour
                    idx={idx}
                    prop={column.prop}
                    value={work.hours[column.prop]}
                    handleChangeHourSelect={handleChangeHourSelect}
                    isReadOnly={timesheetDetail.isSubmitted}
                  />
                ))}
                {!timesheetDetail.isSubmitted && (
                  <td>
                    <Button size="small" color="warning" onClick={() => handleDeleteRow(work.pId)}>
                      🗑
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {!timesheetDetail.isSubmitted && (
          <>
            <Button
              variant="outlined"
              sx={{ marginTop: '0.5rem', height: '2.5rem' }}
              fullWidth
              onClick={() => setModal(true)}
            >
              + Add a row
            </Button>
            <Button variant="contained" sx={{ marginTop: '2rem', height: '3rem' }} fullWidth>
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default TimesheetForm;
