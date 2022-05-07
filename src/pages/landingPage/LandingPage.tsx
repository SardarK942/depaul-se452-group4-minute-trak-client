import { Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.header_title}>
          MinuteTrak
        </Link>
        <Button
          onClick={() => navigate('/home')}
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem', fontSize: '1.25rem' }}
        >
          Guest Enter
        </Button>
      </div>
      <div className={styles.content_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
