import { View, StyleSheet } from 'react-native';
import PageContainer from '../../components/PageContainer';
import EventLink2 from '../../components/EventLink2';

export default function NewAppointment() {
  return (
    <PageContainer title="Novo Agendamento" returnTo="/appointments">
      <View style={styles.homeGroup}>
        <EventLink2 icon="doctor" title="Consulta" to="specialties" />
        <EventLink2 icon="chart-line" title="Exame" to=""/>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  homeGroup: {
    display: 'flex'
  }
});
