import { Button } from '@mui/material';
import styles from './LandingPageIndex.module.css';
import { useNavigate } from 'react-router-dom';

function LandingPageIndex() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.content_container_left}></div>
      <div className={styles.content_container_right}>
        <div className={styles.title}>Streamlined Pay-Roll System</div>
        <div className={styles.desc}>Submit your timesheet bi-weekly</div>
        <div className={styles.desc}>Request your time-off</div>

        <div className={styles.btns}>
          <Button onClick={() => navigate('/login')} variant="contained" sx={{ width: '100%', fontSize: '1.25rem' }}>
            Sign-in
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            variant="contained"
            color="secondary"
            sx={{ width: '100%', fontSize: '1.25rem', marginLeft: '1rem' }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default LandingPageIndex;
