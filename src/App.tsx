import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import LandingPage from './pages/landingPage/LandingPage';
import LandingPageIndex from './components/landingPage/LandingPageIndex';
import LandingPageLogin from './components/landingPage/LandingPageLogin';
import Timesheet from './pages/timesheetPage/TimesheetPage';
import RequestPage from './pages/requestPage/RequestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<LandingPageIndex />} />
          <Route path="login" element={<LandingPageLogin isRegister={false} />} />
          <Route path="signup" element={<LandingPageLogin isRegister={true} />} />
        </Route>

        <Route path="/home" element={<Layout />}>
          <Route index element={<h1>HOME</h1>} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="request" element={<RequestPage />} />
          <Route path="profile" element={<h1>profile</h1>} />
        </Route>

        <Route path="/admin" element={<></>}>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
