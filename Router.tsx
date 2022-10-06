import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import HomeLayout from './app/layouts/HomeLayout';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import History from './app/pages/History';
import Notifications from './app/pages/Notifications';
import Settings from './app/pages/Settings';
import Help from './app/pages/Help';
import PatientLogin from './app/pages/PatientLogin';
import PatientRegister from './app/pages/PatientRegister';
import NewAppointment from './app/pages/appointments/NewAppointment';
import Specialties from './app/pages/Specialties';
import AuthGuard from './app/guards/AuthGuard';
import Medicines from './app/pages/medicines/Medicines';
import NewMedicine from './app/pages/medicines/NewMedicine';
import EditMedicine from './app/pages/medicines/EditMedicine';
import Empty from './app/components/Empty';
import PatientPersonalInfo from './app/pages/PatientPersonalInfo';
import DoctorLogin from './app/pages/DoctorLogin';
import DoctorRegister from './app/pages/DoctorRegister';
import DoctorPersonalInfo from './app/pages/DoctorPersonalInfo';
import Appointments from './app/pages/appointments/Appointments';
import ViewAppointment from './app/pages/appointments/ViewAppointment';
import ConfirmAppointment from './app/pages/appointments/ConfirmAppointment';

export default function Router() {
  return (
    <NativeRouter>
      <AuthGuard>
        <Routes>
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/new" element={<NewAppointment/>}/>
            <Route path="appointments/new/confirm/:id" element={<ConfirmAppointment/>}/>
            {/* <Route path="appointments/new/specialties" element={<Specialties/>}/> */}
            <Route path="appointment/:id" element={<ViewAppointment />} />
            <Route path="results" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/personal-info/patient" element={<PatientPersonalInfo />} />
            <Route path="settings/personal-info/doctor" element={<DoctorPersonalInfo />} />
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
