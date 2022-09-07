import { View, StyleSheet } from 'react-native';
import ProfileLink from '../components/ProfileLink';
import PageContainer from '../components/PageContainer';

export default function Help() {
    return (
      <PageContainer title="Ajuda" returnTo="/profile">
        <View style={styles.blocks}>
        <ProfileLink to="" title="Central de ajuda" icon="help-circle-outline" />
        <ProfileLink to="" title="Fale conosco" icon="account-supervisor-outline" />
        <ProfileLink to="" title="Termos e Política de Privacidade" icon="file-document-outline" />
        </View>
      </PageContainer>
      )}

const styles = StyleSheet.create({
    blocks: {
        display: 'flex',
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: 'whitesmoke'
      }
})