import { NativeRouter, Routes, Route } from 'react-router-native';
import HomeLayout from './app/layouts/HomeLayout';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import History from './app/pages/History';

export default function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="appointments" element={<Home />} />
          <Route path="results" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}
