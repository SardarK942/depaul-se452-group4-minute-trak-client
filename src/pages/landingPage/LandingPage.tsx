import { Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authAPI from '../../apis/authAPI';
import styles from './LandingPage.module.css';

function LandingPage() {
  const navigate = useNavigate();

  async function handleGuestEnter() {
    try {
      const { data } = await authAPI.get('/guest');
      // Store auth info in the session storage
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('name', `${data.firstName} ${data.lastName}`);
      sessionStorage.setItem('token', data.token);
      navigate('/home/timesheet');
      //
    } catch (e: any) {
      console.error(e);
      alert(e.toString());
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.header_title}>
          MinuteTrak
        </Link>
        <Button
          onClick={handleGuestEnter}
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem', fontSize: '1.25rem' }}
        >
          Guest Enter
        </Button>
        <Button
          onClick={() => navigate('/admin')}
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem', fontSize: '1.25rem' }}
        >
          Admin Enter
        </Button>

      </div>
      <div className={styles.content_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
