import { Typography } from '@mui/material';
import { TimesheetListItem, TimesheetListData } from '../../../types/timesheetTypes';
import { getStatus } from '../../../utility/common';
import { StatusTag } from '../../common/tag/Tag';
import styles from './TimesheetList.module.css';

interface TimesheetListProps {
  data: TimesheetListData | null;
  handleClickListItem: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

function TimesheetList({ data: timesheetList, handleClickListItem }: TimesheetListProps) {
  return (
    <ul className={styles.list}>
      {timesheetList?.map((item: TimesheetListItem) => {
        const { tid, startDate, endDate, submitted, approved, rejected } = item;
        return (
          <li key={tid} id={String(tid)} className={styles.list_item} onClick={handleClickListItem}>
            <div className={styles.list_item_left}>
              <Typography variant="body1">{startDate}</Typography>
              <Typography variant="body1">~ {endDate}</Typography>
            </div>
            <div className={styles.list_item_right}>
              <StatusTag status={getStatus(submitted, approved, rejected)} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TimesheetList;
