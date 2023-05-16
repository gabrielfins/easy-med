import { useEffect, useMemo, useState, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { onValue } from 'firebase/database';
import { DoctorService } from '../../services/doctor-service';
import { Doctor } from '../../models/doctor';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PageContainer from '../../components/PageContainer';
import DoctorCard from '../../components/DoctorCard';
import { useParams } from 'react-router-native';

export default function NewAppointment() {
  const [doctors, setDoctors] = useState<Record<string, Doctor>>({});
  const [filteredDoctors, setFilteredDoctors] = useState<Record<string, Doctor>>({});
  const doctorService = useMemo(() => new DoctorService(), []);

  const params = useParams();

  const searchInput = useRef<TextInput>(null);

  useEffect(() => {
    onValue(doctorService.watchAll(), (snapshot) => {
      setDoctors(snapshot.val());
      setFilteredDoctors(snapshot.val());
    });
  }, []);

  useEffect(() => {
    searchInput.current?.focus();
  }, [searchInput]);

  const filter = (filter: string) => {
    const doctorsClone = {...doctors};
    for (let key in doctorsClone) {
      if (!doctorsClone[key].name.toLowerCase().includes(filter.toLowerCase()) && !doctorsClone[key].specialty.toLowerCase().includes(filter.toLowerCase())) {
        delete doctorsClone[key];
      }
    }
    setFilteredDoctors(doctorsClone);
  };

  return (
    <PageContainer title="Novo Agendamento" returnTo="/appointments">
      <View style={styles.searchContent}>
        <MaterialIcons name="magnify" size={28} color="#ADADAD" />
        <TextInput ref={searchInput} style={styles.searchInput} placeholder="Busque um médico ou especialidade" onChangeText={filter} />
      </View>
      <View style={styles.homeGroup}>
        {Object.entries(filteredDoctors).map(([key, value], index) => (
          <View key={key}>
            {/*
              a parte de informação tá uma bagunça.
              esse código ta aí pra formatar se o médico atende presencial e online e os valores
              dos seus respectivos métodos de agendamento.
            */}
            <DoctorCard
              title={value.name}
              description={value.specialty}
              info={`${value.consultType ? value.consultType : ''}${value.onlineConsultValue ? ` • R$ ${Number(value.onlineConsultValue).toFixed(2)}` : ''}${value.onlineConsultValue && value.presentialConsultValue ? ' -' : value.onlineConsultValue && !value.presentialConsultValue ? '' : ' •'}${value.presentialConsultValue ? ` R$ ${Number(value.presentialConsultValue).toFixed(2)}` : ''}`}
              to={`confirm/${key}`}
            />
            {index < Object.entries(filteredDoctors).length ? <View style={styles.vSeparator} /> : null}
          </View>
        ))}
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
    padding: 12
  },
  vSeparator: {
    height: 8
  }
});
