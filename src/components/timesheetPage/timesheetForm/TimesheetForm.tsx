import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Column, Project, TimesheetDetail, Work } from '../../../types/timesheetTypes';
import { StatusTag } from '../../common/tag/Tag';
import TdSelectHour from '../tdSelectHour/TdSelectHour';

import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import styles from './TimesheetForm.module.css';
import ModalSelect from '../../common/modal/ModalSelectProject';
import { getStatus } from '../../../utility/common';

interface TimesheetFormProps {
  data: TimesheetDetail;
  projects: Project[] | null;
  handleSubmit: Function;
}

function TimesheetForm({ data, projects, handleSubmit }: TimesheetFormProps) {
  const [timesheetDetail, setTimesheetDetail] = useState<TimesheetDetail>(data);
  const [isModalOn, setModal] = useState<boolean>(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const { startDate, endDate, works, submitted, approved, rejected } = timesheetDetail;

  useEffect(() => {
    setTimesheetDetail(data);
    setColumns(generateColumns(data));
  }, [data]);

  function handleChangeHourSelect(index: number, prop: string, newValue: number): void {
    const newWorks: Work[] = [...works];
    newWorks[index].hours[prop] = newValue;
    setTimesheetDetail({ ...timesheetDetail, works: newWorks });
  }

  function handleDeleteRow(pid: number): void {
    const newWorks: Work[] = [...works].filter((work) => work.pid !== pid);
    setTimesheetDetail({ ...timesheetDetail, works: newWorks });
  }

  function getProjectName(pid: number): string {
    return projects!.filter((project) => project.pid === pid)[0].name;
  }

  function handleAddRow(pid: number): void {
    const newWork: Work = {
      pid,
      name: getProjectName(pid),
      hours: {},
    };
    setTimesheetDetail({ ...timesheetDetail, works: [...works, newWork] });
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

  function calculateRowTotal(aRow: { [prop: string]: number }, columns: Column[]): number {
    let result: number = 0;
    columns.forEach((column) => {
      if (aRow[column.prop]) {
        result += aRow[column.prop];
      }
    });
    return result;
  }

  return (
    <>
      {isModalOn && <ModalSelect projects={projects} works={works} setModal={setModal} handleAddRow={handleAddRow} />}
      <div className={styles.form}>
        <div>
          <StatusTag status={getStatus(submitted, approved, rejected)} style={{ fontSize: '1.125rem' }} />
          <Typography variant="h5" sx={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
            {`Start Date: ${startDate}`}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {`End Date: ${endDate}`}
          </Typography>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '8rem' }} key="projectName">
                Project
              </th>
              {columns.map((column) => (
                <th key={column.prop} style={{ fontSize: '0.875rem' }}>
                  {column.label}
                </th>
              ))}
              <th style={{ width: '4rem' }}>Total</th>
              {getStatus(submitted, approved, rejected) === 'draft' && <th style={{ width: '4rem' }}>DELETE</th>}
            </tr>
          </thead>

          <tbody>
            {/* TODO : RENDER PTO ROW  */}
            {/* <tr className={styles.pto_tr}>
              <td>PTO</td>
              {columns.map((column) => (
                <td id={column.prop}>{pto.hours[column.prop]}</td>
              ))}
              <td>{calculateRowTotal(data.pto.hours, columns)}</td>
              {getStatus(submitted, approved, rejected) === 'draft' && <td />}
            </tr> */}

            {/* RENDER WORKS ROW*/}
            {works.map((work, idx) => (
              <tr key={work.pid}>
                <td>{getProjectName(work.pid)}</td>
                {columns.map((column) => (
                  <TdSelectHour
                    idx={idx}
                    prop={column.prop}
                    value={work.hours[column.prop] || null}
                    handleChangeHourSelect={handleChangeHourSelect}
                    isReadOnly={submitted}
                  />
                ))}
                <td>{calculateRowTotal(work.hours, columns)}</td>
                {getStatus(submitted, approved, rejected) === 'draft' && (
                  <td>
                    <Button size="small" color="warning" onClick={() => handleDeleteRow(work.pid)}>
                      🗑
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {getStatus(submitted, approved, rejected) === 'draft' && (
          <>
            <Button
              variant="outlined"
              sx={{ marginTop: '2rem', height: '3rem' }}
              fullWidth
              onClick={() => setModal(true)}
            >
              + Add a row
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: '1rem', height: '3rem' }}
              fullWidth
              onClick={() => handleSubmit(timesheetDetail)}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default TimesheetForm;
