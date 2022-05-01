import { Typography } from '@mui/material';
import { TimesheetListItem, TimesheetListData } from '../../../types/timesheetTypes';
import { ApprovedTag, SubmittedTag } from '../../common/tag/Tag';
import styles from './TimesheetList.module.css';

interface TimesheetListProps {
  data: TimesheetListData | null;
  handleClickListItem: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

function TimesheetList({ data: timesheetList, handleClickListItem }: TimesheetListProps) {
  return (
    <ul className={styles.list}>
      {timesheetList?.map((item: TimesheetListItem) => {
        const { tId, startDate, endDate, isSubmitted, isApproved } = item;
        return (
          <li key={tId} id={String(tId)} className={styles.list_item} onClick={handleClickListItem}>
            <div className={styles.list_item_left}>
              <Typography variant="body1">{startDate}</Typography>
              <Typography variant="body1">~ {endDate}</Typography>
            </div>
            <div className={styles.list_item_right}>
              <SubmittedTag isOn={isSubmitted} />
              <ApprovedTag isOn={isApproved} style={{ marginTop: '0.25rem' }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TimesheetList;
