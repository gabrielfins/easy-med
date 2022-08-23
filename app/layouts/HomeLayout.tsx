import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

export default function HomeLayout() {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'home', title: 'Início', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'appointments', title: 'Agendar', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline' },
    { key: 'results', title: 'Resultados', focusedIcon: 'ballot', unfocusedIcon: 'ballot-outline' },
    { key: 'profile', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline' }
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    appointments: Home,
    results: Home,
    profile: Profile
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
