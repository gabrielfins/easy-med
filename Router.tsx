import { NativeRouter, Routes, Route } from 'react-router-native';
import HomeLayout from './app/layouts/HomeLayout';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import History from './app/pages/History';
import Notifications from './app/pages/Notifications';
import Appointments from './app/pages/Appointments';
import Login from './app/pages/Login';

export default function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="results" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}
