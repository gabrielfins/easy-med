import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { colors } from '../../styles/colors';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor-service';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointment';
import { useAuth } from '../../hooks/use-auth';
import AppText from '../../components/AppText';
import PageContainer from '../../components/PageContainer';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Empty from '../../components/Empty';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';

export default function ConfirmAppointment() {
  const { patient } = useAuth();

  const [doctor, setDoctor] = useState<Doctor | null>();
  const [showConsultType, setShowConsultType] = useState(2);
  const [consultType, setConsultType] = useState<'Presencial' | 'Online'>('Presencial');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const doctorService = useMemo(() => new DoctorService(), []);
  const appointmentService = useMemo(() => new AppointmentService(), []);

  useEffect(() => {   
    doctorService.get(params.id || '')
    .then(setDoctor)
    .catch(console.log);
  }, []);

  useEffect(() => {
    setShowConsultType(doctor?.consultType === 'Presencial e Online' ? 0 : doctor?.consultType === 'Presencial' ? 1 : 2);
    setConsultType(doctor?.consultType === 'Presencial e Online' ? 'Presencial' : doctor?.consultType === 'Online' ? 'Online' : 'Presencial');
  }, [doctor]);
  
  if (doctor === null || doctor === undefined) {
    return <Empty />;
  }
  
  const confirmAppointment = async () => {
    if (!patient) return;

    const appointment: Appointment = {
      date: new Date(`${date} ${time}`).toISOString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      isDone: false,
      location: '',
      patientId: patient.id,
      patientName: patient.name,
      price: Number(doctor.presentialConsultValue),
      type: consultType
    }

    try {
      await appointmentService.add(appointment);
      navigate('/appointments');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={{flex: 1}}>
      <PageContainer title="Confirmar Agendamento" returnTo="/appointments/new">
        <View style={styles.container}>
          <View style={styles.doctorContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="doctor" size={40} color={colors.primary} />
            </View>
            <View style={styles.doctorContainerInfo}>
              <AppText size={18}>{doctor.name}</AppText>
              <AppText style={{color: '#a7a7a7'}}>{doctor.specialty}</AppText>
            </View>
            <IconButton icon="close" underlayColor="#DADADA" link to="/appointments/new" />
          </View>
          <View style={styles.appointmentInfo}>
            <View>
              <AppText>Tipo de consulta</AppText>
              {showConsultType === 0 ? (
                <View style={styles.consultType}>
                  <Button
                    style={{
                      flex: .5,
                      backgroundColor: consultType === 'Presencial' ? colors.secondary : 'transparent'
                    }}
                    type="tonal"
                    onPress={() => setConsultType('Presencial')}
                  >Presencial</Button>
                  <View style={styles.hSeparator} />
                  <Button
                    style={{
                      flex: .5,
                      backgroundColor: consultType === 'Online' ? colors.secondary : 'transparent'
                    }}
                    type="tonal"
                    onPress={() => setConsultType('Online')}
                  >Online</Button>
                </View>
              ) : null}
              {showConsultType === 1 ? (
                <View style={styles.consultType}>
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: consultType === 'Presencial' ? colors.secondary : 'transparent'
                    }}
                    type="tonal"
                    onPress={() => setConsultType('Presencial')}
                  >Presencial</Button>
                </View>
              ) : null}
              {showConsultType === 2 ? (
                <View style={styles.consultType}>
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: consultType === 'Online' ? colors.secondary : 'transparent'
                    }}
                    type="tonal"
                    onPress={() => setConsultType('Online')}
                  >Online</Button>
                </View>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Input label="Data" value={date} onChangeText={setDate} />
              <View style={{height: 8}} />
              <Input label="Hora" value={time} onChangeText={setTime} />
            </View>
          </View>
        </View>
      </PageContainer>
      <View style={styles.actions}>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <AppText>Valor da Consulta:</AppText>
          <View style={{ flex: 1 }} />
          <AppText weight="bold">R$ {consultType === 'Online' ? Number(doctor.onlineConsultValue).toFixed(2) : Number(doctor.presentialConsultValue).toFixed(2)}</AppText>
        </View>
        <Button type="tonal" stretch onPress={confirmAppointment}>Confirmar Agendamento</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F3F3'
  },
  doctorContainerInfo: {
    flex: 1,
    marginLeft: 12
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.secondary
  },
  appointmentInfo: {
    marginTop: 24,
    marginLeft: 6,
    paddingHorizontal: 12
  },
  consultType: {
    flexDirection: 'row',
    marginTop: 8
  },
  inputContainer: {
    marginTop: 24
  },
  actions: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    paddingHorizontal: 12
  },
  hSeparator: {
    width: 8
  }
});

