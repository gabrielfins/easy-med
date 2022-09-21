import { View, StyleSheet, TextInput } from 'react-native';
import PageContainer from '../components/PageContainer';
import EventLink3 from '../components/EventLink3';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Specialties() {
  return (
    <PageContainer title="Nova Consulta" returnTo="/appointments/new">
      <View>
        <View style={styles.searchContent}>
          <MaterialIcons name="magnify" size={28} color="#ADADAD" />
          <TextInput style={styles.searchInput} placeholder="Especialidade, médico, etc..." />
        </View>
        <View style={styles.homeGroup}>
          <EventLink3 title="Cardiologia" info="2 médicos" to="" />
          <EventLink3 title="Dermatologia" info="2 médicos" to="" />
          <EventLink3 title="Genecologia" info="3 médicos" to="" />
          <EventLink3 title="Neurologia" info="4 médicos" to="" />
          <EventLink3 title="Ortopedia" info="5 médicos" to="" />
          <EventLink3 title="Otorrinolaringologia" info="1 médicos" to="" />
          <EventLink3 title="Pediatria" info="4 médicos" to=""/>
          <EventLink3 title="Psiquiatria" info="2 médicos" to="" />
        </View>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  searchContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#ADADAD', 
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: 'black',
  },
  homeGroup: {
    display: 'flex',
  }
});