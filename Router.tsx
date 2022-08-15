import { NativeRouter, Routes, Route } from 'react-router-native';
import Home from './app/pages/Home';

export default function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </NativeRouter>
  );
}
