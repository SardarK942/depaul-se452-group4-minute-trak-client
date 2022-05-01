import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  function navLinkStyle(styles: { isActive: boolean }) {
    return {
      backgroundColor: styles.isActive ? '#ffffff80' : '',
      padding: '0.5rem 1rem',
      borderRadius: '12px',
    };
  }

  return (
    <nav className={styles.container}>
      <Link to="/home" className={styles.title}>
        MinuteTrak
      </Link>
      <div className={styles.items}>
        <NavLink className={styles.item} to="./timesheet" style={navLinkStyle}>
          Timesheet
        </NavLink>
        <NavLink className={styles.item} to="./request" style={navLinkStyle}>
          Request
        </NavLink>
        <NavLink className={styles.item} to="./profile" style={navLinkStyle}>
          Profile
        </NavLink>
        <div className={`${styles.item} ${styles.logout}`} onClick={() => alert('logout')}>
          Logout
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
