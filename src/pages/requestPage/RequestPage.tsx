import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalNewRequest from '../../components/common/modal/ModalNewRequest';
import RequestList from '../../components/requestPage/RequestList';
import styles from './RequestPage.module.css';
import { StatusTag } from '../../components/common/tag/Tag';

type Props = {};

function RequestPage({}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [requestList, setRequestList] = useState([]);
  const [requestDetail, setRequestDetail] = useState(null);
  const [isModalOn, setModal] = useState<boolean>(false);

  useEffect(() => {
    const data = [];
    // setRequestList(data);
    // setRequestDetail(data[0]);
  }, []);

  function handleSubmitNewRequest(startDate: string, endDate: string, reason: string, isPaid: boolean): void {
    // POST request
    console.log(startDate);
  }

  return (
    <>
      {isModalOn && <ModalNewRequest handleClose={() => setModal(false)} handleSubmit={handleSubmitNewRequest} />}
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Time-Off Request
          </Typography>
          <Typography variant="h6">John Doe (abhsajkd@asdf.com)</Typography>
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <RequestList />
            <Button onClick={() => setModal(true)} variant="contained" sx={{ height: '4rem', fontSize: '1.25rem' }}>
              New Request
            </Button>
          </div>
          <div className={styles.content}>
            <div>
              <StatusTag status={'approved'} style={{ fontSize: '1.125rem' }} />
              <Typography variant="h5" sx={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                {`Start Date: 2022-04-01`}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {`End Date: 2022-04-02`}
              </Typography>
              <Typography variant="h5" sx={{ marginTop: '1.5rem', fontWeight: 'bold' }}>
                {`Reason for Request:`}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#505050' }}>
                Personal
              </Typography>

              <Typography variant="h5" sx={{ marginTop: '1.5rem', fontWeight: 'bold' }}>
                {`Paid/Unpaid:`}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#505050' }}>
                Paid
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestPage;
