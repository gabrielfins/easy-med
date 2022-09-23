import { View, StyleSheet } from 'react-native';
import NavButton from './NavButton';

export default function NavBar() {
  return (
    <View style={styles.navbar}>
      <NavButton to="/" icon="home-outline" activeIcon="home">Início</NavButton>
      <NavButton to="/appointments" icon="calendar-outline" activeIcon="calendar">Agendar</NavButton>
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
