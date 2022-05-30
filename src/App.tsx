import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import LandingPage from './pages/landingPage/LandingPage';
import LandingPageIndex from './components/landingPage/LandingPageIndex';
import LandingPageLogin from './components/landingPage/LandingPageLogin';
import TimesheetPage from './pages/timesheetPage/TimesheetPage';
import RequestPage from './pages/requestPage/RequestPage';
import AdminPage from './pages/adminPage/AdminPage';
import AccountApprovals from './pages/adminPage/adminViews/accountApprovals';
import TimesheetApprovals from './pages/adminPage/adminViews/timesheetApprovals';
import TimeOffRequestApprovals from './pages/adminPage/adminViews/timeOffRequestApprovals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<LandingPageIndex />} />
          <Route path="login" element={<LandingPageLogin isRegister={false} />} />
          <Route path="signup" element={<LandingPageLogin isRegister={true} />} />
        </Route>

        <Route path="home" element={<Layout />}>
          <Route index element={<h1>HOME</h1>} />
          <Route path="timesheet" element={<TimesheetPage />} />
          <Route path="request" element={<RequestPage />} />
          <Route path="profile" element={<h1>profile</h1>} />
        </Route>

        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="account" element={<AccountApprovals/>} />
          <Route path="timesheet" element={<TimesheetApprovals/>} />
          <Route path="request" element={<TimeOffRequestApprovals/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
