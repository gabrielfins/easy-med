import { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/use-auth';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment-service';
import { onValue } from 'firebase/database';
import { formatDateTime } from '../../helpers/format-date';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import EventLink from '../../components/EventLink';
import Empty from '../../components/Empty';
import EmptyAppointments from './EmptyAppointments';

export default function Appointments() {
  const { patient, doctor } = useAuth();
  const [appointments, setAppointments] = useState<Record<string, Appointment> | null>();

  const appointmentService = useMemo(() => new AppointmentService(), []);

  useEffect(() => {
    let unsubscribe: () => void;

    if (patient) {
      unsubscribe = onValue(appointmentService.watchFromPatient(patient.id), (snapshot) => {
        setAppointments(snapshot.val());
      });
    }

    if (doctor) {
      unsubscribe = onValue(appointmentService.watchFromDoctor(doctor.id), (snapshot) => {
        setAppointments(snapshot.val());
      });
    }

    return () => unsubscribe && unsubscribe();
  }, []);

  if (appointments === undefined) {
    return <Empty />;
  }

  if (appointments === null) {
    return <EmptyAppointments />;
  }

  return (
    <View style={styles.container}>
      <PageContainer title={patient ? 'Agendamentos' : doctor ? 'Atendimentos' : ''}>
        <View style={styles.group}>
          {patient && appointments ? Object.entries(appointments).map(([key, value], index) => (
            <View key={key}>
              <EventLink
                icon="clock-outline"
                description={value.doctorSpecialty}
                info={formatDateTime(value.date)}
                title={value.doctorName}
                to={`/appointment/${key}`}
              />
              {index < Object.entries(appointments).length - 1 ? <View style={styles.vSeparator} /> : null}
            </View>
          )) : null}
          {doctor && appointments ? Object.entries(appointments).map(([key, value], index) => (
            <View key={key}>
              <EventLink
                icon="clock-outline"
                description="Paciente"
                info={formatDateTime(value.date)}
                title={value.patientName}
                to={`/appointment/${key}`}
              />
              {index < Object.entries(appointments).length - 1 ? <View style={styles.vSeparator} /> : null}
            </View>
          )) : null}
        </View>
      </PageContainer>
      {patient ? (
        <View style={styles.buttonContainer}>
          <Button type="tonal" stretch icon="plus" link to="/appointments/new">Novo Agendamento</Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  vSeparator: {
    height: 8
  },
  group: {
    padding: 12
  },
  buttonContainer: {
    padding: 12
  }
});
