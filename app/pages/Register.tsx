import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import { AuthService } from '../services/auth-service';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { useNavigate } from 'react-router-native';
import { PatientService } from '../services/patient-serivce';
import { Patient } from '../models/patient';

export default function Register() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const authService = useMemo(() => new AuthService(), []);
  const patientService = useMemo(() => new PatientService(), []);

  const navigate = useNavigate();

  const register = async () => {
    try {
      const user = await authService.createPatient(email, password);

      const patient: Patient = {
        id: user.user.uid,
        name,
        cpf,
        birthday,
        email
      };

      await patientService.update(user.user.uid, patient);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.login}>
      <AppText style={styles.title} size={32} weight="bold">Easy Med</AppText>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <MaterialIcons name="account-outline" size={44} color="#969696" />
        </View>
        <AppText style={styles.information}>Crie sua conta.</AppText>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          label="Email"
          left={<TextInput.Icon icon="account-outline" color="#9C9C9C" />}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.formFieldMarginTop}
          mode="outlined"
          label="Senha"
          secureTextEntry={hiddenPassword}
          left={<TextInput.Icon icon="lock-outline" color="#9C9C9C" />}
          right={<TextInput.Icon icon={hiddenPassword ? 'eye' : 'eye-off'} color="#9C9C9C" onPress={() => setHiddenPassword(c => !c)} />}
        />
      </View>
      <View style={styles.actionsContainer}>
        <Button stretch onPress={register}>Cadastre-se</Button>
        <AppText style={styles.actionText}>ou</AppText>
        <Button link to="/login" stretch>Faça login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    flex: 1,
    padding: 20
  },
  title: {
    marginBottom: 20,
    color: colors.primary,
    textAlign: 'center'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: '#E3E3E3'
  },
  information: {
    color: '#969696'
  },
  loginForm: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 4
  },
  formFieldMarginTop: {
    marginTop: 10
  },
  forgottenPassword: {
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  forgottenPasswordText: {
    color: '#969696',
    textDecorationColor: '#969696',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
  actionsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 4
  },
  actionText: {
    marginVertical: 12,
    textAlign: 'center',
    color: '#969696'
  }
});
