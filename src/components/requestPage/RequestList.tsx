import { Typography } from '@mui/material';
import { StatusTag } from '../common/tag/Tag';
import styles from './RequestList.module.css';

type Props = {};

function RequestList({}: Props) {
  return (
    <ul className={styles.list}>
      <li key={1} id={String(1)} className={styles.list_item} onClick={() => console.log('click')}>
        <div className={styles.list_item_left}>
          <Typography variant="body1">{'Paid Time-Off'}</Typography>
          <Typography variant="body1">{'2022-04-01 ~ 2022-04-02'}</Typography>
        </div>
        <div className={styles.list_item_right}>
          <StatusTag status={'approved'} />
        </div>
      </li>
    </ul>
  );
}

export default RequestList;
