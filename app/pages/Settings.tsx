import { View, StyleSheet } from 'react-native';
import ProfileLink from '../components/ProfileLink';
import PageContainer from '../components/PageContainer';

export default function Settings() {
  return (
    <PageContainer title="Configurações" returnTo="/profile">
      <View style={styles.blocks}>
        <ProfileLink to="" title="Informações pessoais" icon="account-outline" />
        <ProfileLink to="" title="Senha e segurança" icon="lock-outline" />
        <ProfileLink to="" title="Notificações" icon="bell-outline" />
        <ProfileLink to="" title="Permissões" icon="key-outline" />
        <ProfileLink to="" title="Acessibilidade" icon="human" />
        <ProfileLink to="" title="Tema" description="Claro" icon="lightbulb-on-outline" />
        <ProfileLink to="" title="Idioma" description="Português Brasileiro" icon="earth" />
        <ProfileLink to="" title="Sobre o aplicativo" description="Versão: 1.0" icon="information-outline" />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  blocks: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'whitesmoke'
  }
});