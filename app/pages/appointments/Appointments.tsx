import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import calenderImage from '../../assets/images/calender-dynamic-gradient.png';
import PageContainer from '../../components/PageContainer';
import EventLink from '../../components/EventLink';

export default function Appointments() {
  return (
    <PageContainer title="Agendamentos">
      <View style={styles.homeList}>
        <EventLink
          icon="clock-outline"
          description="Neurologista"
          title="Dr. Luiz Gomes"
          info="25/04/2022 • 17h30"
          to="/"
        />
        <View style={styles.vSeparator} />
        <EventLink
          icon="clock-outline"
          description="Ortopedista"
          title="Dr. Roberto Alvez"
          info="04/05/2022 • 14h00"
          to="/"
        />
        <EventLink
          icon="clock-outline"
          description="Psiquiatra"
          title="Dra. Luiza Pereira"
          info="07/05/2022 • 09h00"
          to="/"
        />
        <EventLink
          icon="clock-outline"
          description="Otorrinolaringologista"
          title="Dra. Ana Clara da Silva"
          info="25/04/2022 • 16h30"
          to="/"
        />
      </View>
      <View style={styles.agendamentocontainer}>
        <Button type="tonal" link to="/" style={styles.buttonNew}>Faça um Agendamento</Button>
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
  },
  agendamentocontainer: {
    display: flex,
    flexdirection: row,
    justifycontent: flex-end,
    alignitems: flex-end,
    padding: 0,
    paddingLeft:20, 
    paddingRight:20,
    paddingBottom: 0,
    gap: 10,

    width: 428,
    height: 361,


    /* Inside auto layout */

    flex: none,
    order: 2,
    alignself: stretch,
    flexgrow: 1,
  },

  buttonNew: {
    /* Auto layout */

  display: flex,
  flexDirection: row,
  justifyContent: center,
  alignitems: center,
  padding: 0,
  paddingLeft: 28, 
  paddingRight: 0, 
  paddingBottom: 20,
  gap: 8,

  width: 139,
  height: 65,

  background: #D1E2FF,
  borderRadius: 15,

  /* Inside auto layout */

  flex: none,
  order: 0,
  flexGrow: 0,
  }
});
