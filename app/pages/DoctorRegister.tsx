import { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';
import { AuthService } from '../services/auth-service';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor-service';
import IconButton from '../components/IconButton';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Input from '../components/Input';

export default function DoctorRegister() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [crm, setCrm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consultType, setConsultType] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [presentialConsultValue, setPresentialConsultValue] = useState('');
  const [onlineConsultValue, setOnlineConsultValue] = useState('');

  const authService = useMemo(() => new AuthService(), []);
  const doctorService = useMemo(() => new DoctorService(), []);

  const register = async () => {
    try {
      const user = await authService.createUser(email, password);

      const doctor: Doctor = {
        id: user.user.uid,
        name,
        gender: gender as any,
        cpf,
        birthday,
        crm,
        specialty,
        email,
        consultType: consultType as any,
        presentialConsultValue: presentialConsultValue,
        onlineConsultValue: onlineConsultValue
      };

      await doctorService.update(user.user.uid, doctor);
    } catch (error) {
      console.log(error);
    }
  };

  const isInvalid = (): boolean => {
    return !name || !cpf || !birthday || !crm  || !specialty || !email || !password;
  };

  return (
    <ScrollView style={styles.login}>
      <AppText style={styles.title} size={32} weight="bold">Easy Med</AppText>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <MaterialIcons name="doctor" size={44} color="#969696" />
        </View>
        <AppText style={styles.information}>Criar conta de Médico</AppText>
      </View>
      <View style={styles.loginForm}>
        <Input
          value={name}
          onChangeText={setName}
          label="Nome"
          textContentType="name"
        />
        <Input
          value={gender}
          onChangeText={setGender}
          label="Gênero"
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
          value={crm}
          onChangeText={setCrm}
          style={styles.formFieldMarginTop}
          label="CRM"
        />
        <Input
          value={specialty}
          onChangeText={setSpecialty}
          style={styles.formFieldMarginTop}
          label="Especialidade"
        />
        <Input
          value={consultType}
          onChangeText={setConsultType}
          style={styles.formFieldMarginTop}
          label="Tipo de consulta"
        />
        <Input
          value={presentialConsultValue}
          onChangeText={setPresentialConsultValue}
          style={styles.formFieldMarginTop}
          label="Valor da consulta presencial"
        />
        <Input
          value={onlineConsultValue}
          onChangeText={setOnlineConsultValue}
          style={styles.formFieldMarginTop}
          label="Valor da consulta online"
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
        <Button link to="/login/doctor" stretch>Faça login</Button>
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
