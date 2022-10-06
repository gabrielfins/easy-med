import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { onValue } from 'firebase/database';
import { AppointmentService } from '../services/appointment-service';
import { Appointment } from '../models/appointment';
import { colors } from '../styles/colors';
import { formatDateTime } from '../helpers/format-date';
import { useAuth } from '../hooks/use-auth';
import { Medicine } from '../models/medicine';
import { MedicineService } from '../services/medicine-service';
import { DoctorService } from '../services/doctor-service';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';
import ShortcutButton from '../components/ShortcutButton';
import EventLink from '../components/EventLink';
import PageContainer from '../components/PageContainer';
import EmptyStateIcon from '../components/EmptyStateIcon';
import calendar from '../../assets/images/calendar-dynamic-gradient.png';

export default function Home() {
  const { patient, doctor } = useAuth();

  const [appointments, setAppointments] = useState<Record<string, Appointment> | null | undefined>();
  const [medicines, setMedicines] = useState<Record<string, Medicine> | null | undefined>();
  
  const appointmentService = useMemo(() => new AppointmentService(), []);
  const medicineService = useMemo(() => new MedicineService(), []);

  useEffect(() => {
    let unsubAppointments: () => void;
    let unsubMedicines: () => void;

    if (patient) {
      unsubAppointments = onValue(appointmentService.watchLastFromPatient(patient.id), (snapshot) => {
        setAppointments(snapshot.val());
      });
  
      unsubMedicines = onValue(medicineService.watchLast(patient.id), (snapshot) => {
        setMedicines(snapshot.val());
      });
    }

    if (doctor) {
      unsubAppointments = onValue(appointmentService.watchLastFromDoctor(doctor.id), (snapshot) => {
        setAppointments(snapshot.val());
      });
    }

    return () => {
      unsubAppointments && unsubAppointments();
      unsubMedicines && unsubMedicines();
    };
  }, [patient, doctor]);

  const doctorService = useMemo(() =>  new DoctorService(), []);

  return (
    <PageContainer>
      <View style={styles.home}>
        <View style={styles.header}>
          <StatusBar backgroundColor={colors.tertiary} />
          <View style={styles.titleContainer}>
            <AppText size={20} weight="bold">Olá, {doctor ? doctor.gender === 'm' ? 'Dr.' : 'Dra.' : ''} {patient ? patient.name : doctor ? doctor.name : ''}</AppText>
            <Link style={styles.avatarLink} to="/profile" underlayColor={colors.secondary}>
              <MaterialIcons name="account-outline" size={28} color="white" />
            </Link>
          </View>
          {/* <View style={styles.searchContainer}>
            <AppText>O que você precisa?</AppText>
            <View style={styles.searchContent}>
              <MaterialIcons name="magnify" size={28} color="#ADADAD" />
              <TextInput style={styles.searchInput} placeholder="Especialidade, médico, etc..." />
            </View>
          </View> */}
        </View>
        <View style={styles.homeGroup}>
          {patient ? (
            <>
              <AppText>Acesso rápido</AppText>
              <View style={styles.shortcuts}>
                <ShortcutButton icon="inbox-full" to="/">Receitas</ShortcutButton>
                <View style={styles.separator} />
                <ShortcutButton icon="chart-line" to="/">Exames</ShortcutButton>
                <View style={styles.separator} />
                <ShortcutButton icon="pill" to="/medicines">Remédios</ShortcutButton>
              </View>
            </>  
          ) : null}
        </View>
        {patient && appointments ? (
          <View style={styles.homeGroup}>
            <AppText>Próximos agendamentos</AppText>
            <View style={styles.homeList}>
              {Object.entries(appointments).map(([key, value], index) => (
                <View key={key}>
                  <EventLink
                    icon="clock-outline"
                    description={value.doctorSpecialty}
                    title={value.doctorName}
                    info={formatDateTime(value.date)}
                    to={`/appointment/${key}`}
                  />
                  {index < Object.entries(appointments).length - 1 ? <View style={styles.vSeparator} /> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {doctor && appointments ? (
          <View style={styles.homeGroup}>
            <AppText>Próximos agendamentos</AppText>
            <View style={styles.homeList}>
              {Object.entries(appointments).map(([key, value], index) => (
                <View key={key}>
                  <EventLink
                    icon="clock-outline"
                    description="Paciente"
                    title={value.patientName}
                    info={formatDateTime(value.date)}
                    to={`/appointment/${key}`}
                  />
                  {index < Object.entries(appointments).length - 1 ? <View style={styles.vSeparator} /> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {medicines ? (
          <View style={styles.homeGroup}>
            <AppText>Próximos remédios</AppText>
            <View style={styles.homeList}>
              {Object.entries(medicines).map(([key, value], index) => (
                <View key={key}>
                  <EventLink
                    icon="pill"
                    description={value.description}
                    info={value.time}
                    title={value.name}
                    to={`/medicine/edit/${key}`}
                  />
                  {index < Object.entries(medicines).length - 1 ? <View style={styles.vSeparator} /> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {patient && appointments === null && medicines === null ? (
          <View style={styles.emptyState}>
            <EmptyStateIcon icon={calendar} />
            <AppText>Seus agendamentos e medicamentos aparecerão aqui</AppText>
          </View>
        ) : null}
        {doctor && appointments === null && medicines === null ? (
          <View style={styles.emptyState}>
            <EmptyStateIcon icon={calendar} />
            <AppText>Seus próximos atendimentos aparecerão aqui</AppText>
          </View>
        ) : null}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  home: {
    display: 'flex',
    paddingBottom: 20
  },
  header: {
    display: 'flex',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: colors.tertiary
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24
  },
  searchContainer: {
    marginTop: 16
  },
  searchContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 16, 
    borderRadius: 25,
    backgroundColor: 'white'
  },
  searchInput: {
    flex: 1,
    marginLeft: 8
  },
  homeGroup: {
    display: 'flex',
    padding: 20,
    paddingBottom: 4
  },
  shortcuts: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  homeList: {
    display: 'flex',
    marginTop: 8
  },
  separator: {
    flex: .1
  },
  vSeparator: {
    height: 8
  },
  emptyState: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
