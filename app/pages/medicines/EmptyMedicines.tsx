import { View, StyleSheet } from 'react-native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import EmptyStateIcon from '../../components/EmptyStateIcon';
import file from '../../../assets/images/file-text-dynamic-gradient.png';

export default function EmptyMedicines() {
  return (
    <PageContainer title="Medicamentos" returnTo="/profile">
      <View style={styles.view}>
        <EmptyStateIcon icon={file} />
        <AppText size={28} weight="bold">Sem Medicamentos</AppText>
        <AppText>Você ainda não cadastrou nenhum medicamento.</AppText>
      </View>
      <View style={styles.agendamento}>
        <Button type="tonal" link to="new">Cadastre um Medicamento</Button>
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
  folder: {
    flex: 1,
    width: 250,
    resizeMode: 'contain',
    paddingBottom: 70,
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
  agendamento: {
    color: '#3C84FB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 25,
  }
});
