import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import { Link } from 'react-router-native';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import ProfileLink from '../components/ProfileLink';
import PageContainer from '../components/PageContainer';

export default function Home() {
  return (
    <PageContainer>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.nameBox}>
          <View>
            <View style={styles.avatar}>
              <MaterialIcons name="account-outline" color={colors.primary} size={48} />
            </View>
            <Link style={styles.avatarEdit} underlayColor="#EAEAEA" to="/profile">
              <MaterialIcons name="pencil" size={18} color="#6E6E6E" />
            </Link>
          </View>
          <View style={styles.name}>
            <AppText size={24} weight="bold">Gabriel Oliveira</AppText>
            <AppText style={styles.underName} size={16}>Paciente</AppText>
          </View>
        </View>
      </View>
      <View style={styles.blocks}>
        <ProfileLink to="/notifications" title="Notificações" description="Central de notificações" icon="bell-outline" />
        <ProfileLink to="/history" title="Histórico" description="Consultas realizadas" icon="folder-outline" />
        <ProfileLink to="/configurations" title="Configurações" description="Privacidade, segurança e mais" icon="cog-outline" />
        <ProfileLink to="/profile" title="Dê sua opinião" description="Compartilhe sua experiência" icon="text-box-outline" />
        <ProfileLink to="/help" title="Ajuda" description="Ajuda, fale conosco, e mais" icon="account-question-outline" />
        <ProfileLink to="/login" title="Sair" icon="exit-to-app" />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.secondary,
  },
  avatarEdit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: 'white'
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
