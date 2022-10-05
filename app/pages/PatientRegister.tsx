import { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import { AuthService } from '../services/auth-service';
import { PatientService } from '../services/patient-serivce';
import { Patient } from '../models/patient';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Input from '../components/Input';
import IconButton from '../components/IconButton';

export default function PatientRegister() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const authService = useMemo(() => new AuthService(), []);
  const patientService = useMemo(() => new PatientService(), []);

  const register = async () => {
    try {
      const user = await authService.createUser(email, password);

      const patient: Patient = {
        id: user.user.uid,
        name,
        cpf,
        birthday,
        email
      };

      await patientService.update(user.user.uid, patient);
    } catch (error) {
      console.log(error);
    }
  };

  const isInvalid = (): boolean => {
    return !name || !cpf || !birthday || !email || !password;
  };

  return (
    <ScrollView style={styles.login}>
      <AppText style={styles.title} size={32} weight="bold">Easy Med</AppText>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <MaterialIcons name="account" size={44} color="#969696" />
        </View>
        <AppText style={styles.information}>Criar conta de Paciente</AppText>
      </View>
      <View style={styles.loginForm}>
        <Input
          value={name}
          onChangeText={setName}
          label="Nome"
          textContentType="name"
        />
        <Input
          value={cpf}
          onChangeText={setCpf}
          style={styles.formFieldMarginTop}
          label="CPF"
        />
        <Input
          value={birthday}
          onChangeText={setBirthday}
          style={styles.formFieldMarginTop}
          label="Data de nascimento"
        />
        <Input
          value={email}
          onChangeText={setEmail}
          style={styles.formFieldMarginTop}
          label="Email"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          style={styles.formFieldMarginTop}
          label="Senha"
          secureTextEntry={hiddenPassword}
          suffix={<IconButton icon={hiddenPassword ? 'eye' : 'eye-off'} onPress={() => setHiddenPassword(c => !c)} />}
        />
      </View>
      <View style={styles.actionsContainer}>
        <Button stretch onPress={register} disabled={isInvalid()}>Cadastrar-se</Button>
        <AppText style={styles.actionText}>ou</AppText>
        <Button link to="/login/patient" stretch>Faça login</Button>
      </View>
    </ScrollView>
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
    paddingVertical: 32,
    marginBottom: 32
  },
  actionText: {
    marginVertical: 12,
    textAlign: 'center',
    color: '#969696'
  }
});
