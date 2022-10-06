import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { colors } from '../../styles/colors';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointment';
import { formatDate, formatTime } from '../../helpers/format-date';
import { useAuth } from '../../hooks/use-auth';
import PageContainer from '../../components/PageContainer';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../../components/AppText';
import Empty from '../../components/Empty';

export default function ViewAppointment() {
  const { patient, doctor } = useAuth();

  const [appointment, setAppointment] = useState<Appointment>();
  
  const appointmentService = useMemo(() => new AppointmentService(), []);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) return;
    appointmentService.get(params.id)
      .then(appointment => appointment && setAppointment(appointment))
      .catch(console.log);
  }, [params]);

  const cancelAppointment = async () => {
    if (!params || !params.id) return;
    await appointmentService.delete(params.id);
    navigate('/appointments');
  };

  if (appointment === undefined) {
    return <Empty />;
  }

  return (
    <View style={{flex: 1}}>
      <PageContainer title={patient ? 'Agendamento' : doctor ? 'Atendimento' : ''} returnTo="/appointments">
        <View style={styles.container}>
          <View style={styles.doctorContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={patient ? 'doctor' : doctor ? 'account' : 'null'} size={40} color={colors.primary} />
            </View>
            <View style={styles.doctorContainerInfo}>
              <AppText size={18}>{patient ? appointment.doctorName : doctor ? appointment.patientName : ''}</AppText>
              <AppText style={{color: '#a7a7a7'}}>{patient ? appointment.doctorSpecialty : doctor ? 'Paciente' : ''}</AppText>
            </View>
          </View>
          <View style={styles.appointmentInfo}>
            <AppText>Consulta <AppText weight="bold">{appointment.type.toLowerCase()}</AppText></AppText>
            <AppText>Marcada para dia <AppText weight="bold">{formatDate(appointment.date)}</AppText> às <AppText weight="bold">{formatTime(appointment.date)}</AppText></AppText>
            <AppText>Valor: <AppText weight="bold">R$ {appointment.price.toFixed(2)}</AppText></AppText>
          </View>
        </View>
      </PageContainer>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.5} onPress={cancelAppointment}>
          <AppText style={{color: colors.error}} weight="bold">Cancelar {patient ? 'Agendamento' : doctor ? 'Atendimento' : ''}</AppText>
        </TouchableOpacity>
        <View style={styles.hSeparator} />
        <TouchableOpacity style={styles.callButton} activeOpacity={0.5}>
          <MaterialIcons name="phone" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  doctorContainerInfo: {
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
    marginTop: 16,
    marginLeft: 6
  },
  actions: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12
  },
  hSeparator: {
    width: 8
  },
  cancelButton: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.errorSecondary
  },
  callButton: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary
  }
});
