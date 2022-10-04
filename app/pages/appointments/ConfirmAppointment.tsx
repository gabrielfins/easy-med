import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { onValue } from 'firebase/database';
import { DoctorService } from '../../services/doctor-service';
import { Doctor } from '../../models/doctor';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../../components/AppText';
import PageContainer from '../../components/PageContainer';

export default function SelectAppointment() {
  const [doctors, setDoctors] = useState<Record<string, Doctor>>({});
  const doctorService = useMemo(() => new DoctorService(), []);

  useEffect(() => {
    onValue(doctorService.watchAll(), (snapshot) => {
      setDoctors(snapshot.val());
    });
  }, []);

  return (
    <PageContainer title="Nova Consulta" returnTo="/appointments">
      <View style={styles.}>
        {/*Especialidade como titulo*/}<AppText></AppText>
      </View>
      <View style={styles.homeGroup}>
        {/*Botao de 'fechar'/remover o medico, precisa ser mais escuro que o resto da pagina e/ou Cinza Escuro*/}<View key={exit}></View>
      </View>
      {/*Container do tipo de consulta e seleção de Presencial ou Online*/}<View>

      </View>
      {/*Conteiner da data e hora*/}<View>

      </View>
      {/*Conteiner do valor da consulta e botao de confirmar agendamento*/}<View>

      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  specialitytitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
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
