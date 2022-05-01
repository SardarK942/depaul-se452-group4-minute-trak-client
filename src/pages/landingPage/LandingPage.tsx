import { Link, Outlet } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.header_title}>
          MinuteTrak
        </Link>
      </div>
      <div className={styles.content_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
