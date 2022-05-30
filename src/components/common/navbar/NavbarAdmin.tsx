import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function NavbarAdmin() {
  function navLinkStyle(styles: { isActive: boolean }) {
    return {
      backgroundColor: styles.isActive ? '#ffffff80' : '',
      padding: '0.5rem 1rem',
      borderRadius: '12px',
    };
  }

  return (
    <nav className={styles.container}>
      <Link to="/admin" className={styles.title}>
        MinuteTrak
      </Link>
      <div className={styles.items}>
        <NavLink className={styles.item} to="/admin/timesheet" style={navLinkStyle}>
          Timesheet
        </NavLink>
        <NavLink className={styles.item} to="/admin/request" style={navLinkStyle}>
          Request
        </NavLink>
        <NavLink className={styles.item} to="/admin/account" style={navLinkStyle}>
          Account
        </NavLink>
        <div className={`${styles.item} ${styles.logout}`} onClick={() => alert('logout')}>
          Logout
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
