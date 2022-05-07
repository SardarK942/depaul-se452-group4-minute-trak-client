import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/common/navbar/Navbar';

function Layout() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
