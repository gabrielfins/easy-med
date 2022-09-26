import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import HomeLayout from './app/layouts/HomeLayout';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import History from './app/pages/History';
import Notifications from './app/pages/Notifications';
import Settings from './app/pages/Settings';
import Help from './app/pages/Help';
import EmptyAppointments from './app/pages/appointments/EmptyAppointments';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import NewAppointment from './app/pages/appointments/NewAppointment';
import Specialties from './app/pages/Specialties';
import AuthGuard from './app/guards/AuthGuard';
import Medicines from './app/pages/medicines/Medicines';
import NewMedicine from './app/pages/medicines/NewMedicine';
import EditMedicine from './app/pages/medicines/EditMedicine';
import Empty from './app/components/Empty';
import PersonalInfo from './app/pages/PersonalInfo';

export default function Router() {
  return (
    <NativeRouter>
      <AuthGuard>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="appointments" element={<EmptyAppointments />} />
            <Route path="appointments/new" element={<NewAppointment/>}/>
            <Route path="appointments/new/specialties" element={<Specialties/>}/>
            <Route path="results" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/personal-info" element={<PersonalInfo />} />
            <Route path="help" element={<Help />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="medicines/new" element={<NewMedicine />} />
            <Route path="medicine/edit/:id" element={<EditMedicine />} />
          </Route>
          <Route path="/empty" element={<Empty />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthGuard>
    </NativeRouter>
  );
}
