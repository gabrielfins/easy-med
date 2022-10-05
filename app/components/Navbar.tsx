import { View, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/use-auth';
import NavButton from './NavButton';

export default function NavBar() {
  const { patient, doctor } = useAuth();

  return (
    <View style={styles.navbar}>
      <NavButton to="/" icon="home-outline" activeIcon="home">Início</NavButton>
      <NavButton to="/appointments" icon="calendar-outline" activeIcon="calendar">{patient ? 'Agendamentos' : doctor ? 'Atendimentos' : ''}</NavButton>
      {/* <NavButton to="/results" icon="ballot-outline" activeIcon="ballot">Resultados</NavButton> */}
      <NavButton to="/profile" icon="account-outline" activeIcon="account">Perfil</NavButton>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: '#EAEAEA',
    borderTopWidth: 1
  }
});
