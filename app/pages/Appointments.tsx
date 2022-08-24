import { View, StyleSheet, Image } from 'react-native';
import AppText from '../components/AppText';
import calenderImage from '../../assets/images/calender-dynamic-gradient.png';
import ButtonLink from '../components/ButtonLink';

export default function Home() {
  return (
    <View style={styles.profile}>
      <View style ={styles.view}>
        <Image style={styles.folder} source={calenderImage} />
        <AppText size={28} weight="bold">Sem Agendamentos</AppText>
        <AppText>Você não possui nenhum agendamento marcado.</AppText>
      </View>
      <View style={styles.agendamento}>
        <ButtonLink type="tonal" to="/agendamento">Faça um Agendamento</ButtonLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    backgroundColor: 'white'
  },
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
  },
});
