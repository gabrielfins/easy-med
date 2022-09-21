import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import EmptyStateIcon from '../components/EmptyStateIcon';
import bell from '../../assets/images/bell-dynamic-gradient.png';

export default function Notifications() {
  return (
    <PageContainer title="Notificações" returnTo="/profile">
      <View style={styles.view}>
        <EmptyStateIcon icon={bell} />
        <AppText size={28} weight="bold">Sem notificações</AppText>
        <AppText>Você ainda não recebeu nenhuma notificação.</AppText>
      </View>
      <View style={styles.voltar}>
        <Button type="tonal" link to="/profile">Voltar Para o Perfil</Button>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  text1: {
    fontFamily: 'OpenSans',
    fontSize: 26,
    fontWeight: '900',
    paddingBottom: 10,
  },
  text2:{
    fontFamily: 'OpenSans',
    fontSize: 13,
    paddingBottom: 5,
  },
  text3: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#D1E2FF',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3,
  },
  voltar: {
    color: '#3C84FB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 25,
  }
})