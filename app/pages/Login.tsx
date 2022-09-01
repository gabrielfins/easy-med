import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Link } from 'react-router-native';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { colors } from '../styles/colors';

export default function Login() {
  return (
    <View style={styles.login}>
      <AppText style={styles.title} size={32} weight="bold">Easy Med</AppText>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <MaterialIcons name="account-outline" size={44} color="#969696" />
        </View>
        <AppText style={styles.information}>Para começar, faça login.</AppText>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          mode="outlined"
          label="Email"
          left={<TextInput.Icon name="account-outline" color="#9C9C9C" />}
        />
        <TextInput
          style={styles.formFieldMarginTop}
          mode="outlined"
          label="Senha"
          secureTextEntry={true}
          left={<TextInput.Icon name="lock-outline" color="#9C9C9C" />}
          right={<TextInput.Icon name="eye" color="#9C9C9C" />}
        />
        <Link style={[styles.formFieldMarginTop, styles.forgottenPassword]} underlayColor="#e2e2e2" to="/">
          <AppText style={styles.forgottenPasswordText}>Esqueceu a senha?</AppText>
        </Link>
      </View>
      <View style={styles.actionsContainer}>
        <Button link to="/" stretch>Login</Button>
        <AppText style={styles.actionText}>ou</AppText>
        <Button stretch>Cadastre-se</Button>
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
