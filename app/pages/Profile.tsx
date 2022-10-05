import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import { Link, useNavigate } from 'react-router-native';
import { AuthService } from '../services/auth-service';
import { useAuth } from '../hooks/use-auth';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import ProfileLink from '../components/ProfileLink';
import PageContainer from '../components/PageContainer';
import ProfileButton from '../components/ProfileButton';

export default function Profile() {
  const authService = useMemo(() => new AuthService(), []);
  const navigate = useNavigate();

  const { patient, doctor } = useAuth();

  const logout = async () => {
    await authService.logout();
    if (patient) {
      navigate('/login/patient');
    } else {
      navigate('/login/doctor');
    }
  };

  return (
    <PageContainer>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.nameBox}>
          <View>
            <View style={styles.avatar}>
              <MaterialIcons name="account-outline" color={colors.primary} size={36} />
            </View>
            <Link style={styles.avatarEdit} underlayColor="#EAEAEA" to={`/settings/personal-info/${patient ? 'patient' : doctor ? 'doctor' : ''}`}>
              <MaterialIcons name="pencil" size={18} color="#6E6E6E" />
            </Link>
          </View>
          <View style={styles.name}>
            <AppText size={18} weight="bold">{patient? patient.name : doctor ? doctor.name : ''}</AppText>
            <AppText style={styles.underName}>{patient ? 'Paciente' : doctor ? 'Médico' : ''}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.blocks}>
        {patient ? (
          <ProfileLink to="/medicines" title="Medicamentos" description="Lembretes de medicação" icon="pill" />
        ) : null}
        <ProfileLink to="/notifications" title="Notificações" description="Central de notificações" icon="bell-outline" />
        <ProfileLink to="/history" title="Histórico" description="Consultas realizadas" icon="folder-outline" />
        <ProfileLink to="/settings" title="Configurações" description="Privacidade, segurança e mais" icon="cog-outline" />
        {/* <ProfileLink to="/profile" title="Dê sua opinião" description="Compartilhe sua experiência" icon="text-box-outline" />
        <ProfileLink to="/help" title="Ajuda" description="Ajuda, fale conosco, e mais" icon="account-question-outline" /> */}
        <ProfileButton title="Sair" icon="exit-to-app" onPress={logout} />
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
    width: 75,
    height: 75,
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
