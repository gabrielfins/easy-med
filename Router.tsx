import { NativeRouter, Routes, Route } from 'react-router-native';
import HomeLayout from './app/layouts/HomeLayout';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import History from './app/pages/History';
import Notifications from './app/pages/Notifications';
import Settings from './app/pages/Settings';
import Help from './app/pages/Help';
import Appointments from './app/pages/Appointments';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import ProtectedRoute from './app/components/ProtectedRoute';
import NewAppointment from './app/pages/NewAppointment';
import Specialties from './app/pages/Specialties';

export default function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><HomeLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="results" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="configurations" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="newappointment" element={<NewAppointment/>}/>
          <Route path="specialties" element={<Specialties/>}/>
        </Route>
      </Routes>
    </NativeRouter>
  );
}
