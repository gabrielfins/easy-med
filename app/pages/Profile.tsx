import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import AppText from '../components/AppText';
import ProfileLink from '../components/ProfileLink';

export default function Home() {
  return (
    <View style={styles.profile}>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.nameBox}>
          <Avatar.Icon icon="account" size={90} />
          <View style={styles.name}>
            <AppText size={24} weight="bold">Gabriel Oliveira</AppText>
            <AppText style={styles.underName} size={16}>Paciente</AppText>
          </View>
        </View>
      </View>
      <View style={styles.blocks}>
        <ProfileLink to="/profile" title="Notificações" description="Central de notificações" icon="bell-outline" />
        <ProfileLink to="/history" title="Histórico" description="Consultas realizadas" icon="folder-outline" />
        <ProfileLink to="/profile" title="Configurações" description="Privacidade, segurança e mais" icon="cog-outline" />
        <ProfileLink to="/profile" title="Dê sua opinião" description="Compartilhe sua experiência" icon="text-box-outline" />
        <ProfileLink to="/profile" title="Ajuda" description="Ajuda, fale conosco, e mais" icon="account-question-outline" />
        <ProfileLink to="/profile" title="Sair" icon="exit-to-app" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'white'
  },
  nameBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
  },
  underName: {
    color: 'grey'
  },
  blocks: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'whitesmoke'
  }
});
