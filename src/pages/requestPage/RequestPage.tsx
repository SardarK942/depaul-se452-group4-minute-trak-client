import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalNewRequest from '../../components/common/modal/ModalNewRequest';
import RequestList from '../../components/requestPage/RequestList';
import styles from './RequestPage.module.css';
type Props = {};

function RequestPage({}: Props) {
  const [requestList, setRequestList] = useState(null);
  const [requestDetail, setRequestDetail] = useState(null);
  const [isModalOn, setModal] = useState<boolean>(false);

  useEffect(() => {
    const data = [];
    // setRequestList(data);
    // setRequestDetail(data[0]);
  }, []);

  function handleSubmitNewRequest(startDate: string, endDate: string, reason: string, isPaid: boolean): void {
    // POST request
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
        </div>
      </div>
    </>
  );
}

export default RequestPage;
