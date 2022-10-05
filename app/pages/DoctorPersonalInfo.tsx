import { useState, useMemo } from 'react';
import { useAuth } from '../hooks/use-auth';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor-service';
import Button from '../components/Button';
import Input from '../components/Input';
import PageContainer from '../components/PageContainer';

export default function DoctorPersonalInfo() {
  const { doctor } = useAuth();
  
  const [info, setInfo] = useState<Doctor>({
    birthday: doctor?.birthday || '',
    cpf: doctor?.cpf || '',
    email: doctor?.email || '',
    id: doctor?.id || '',
    name: doctor?.name || '',
    gender: doctor?.gender || '',
    phoneNumber: doctor?.phoneNumber || '',
    consultType: doctor?.consultType || '',
    crm: doctor?.crm || '',
    onlineConsultValue: doctor?.onlineConsultValue || '',
    presentialConsultValue: doctor?.presentialConsultValue || '',
    specialty: doctor?.specialty || ''
  });

  const doctorService = useMemo(() => new DoctorService(), []);

  const navigate = useNavigate();

  const updateDoctor = async () => {
    if (!doctor?.id) return;

    try {
      await doctorService.update(doctor.id , info);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <PageContainer style={styles.content} title="Informações Pessoais" returnTo="/settings">
        <Input label="Nome" style={styles.input} value={info.name} onChangeText={(name) => setInfo(c => {return {...c, name}})} />
        <Input label="Especialidade" style={styles.input} value={info.specialty} onChangeText={(specialty) => setInfo(c => {return {...c, specialty: specialty}})} />
        <Input label="CPF" style={styles.input} value={info.cpf} onChangeText={(cpf) => setInfo(c => {return {...c, cpf}})} />
        <Input label="Telefone" style={styles.input} value={info.phoneNumber} onChangeText={(phoneNumber) => setInfo(c => {return {...c, phoneNumber}})} />
        <Input label="Data de nascimento" style={styles.input} value={info.birthday} onChangeText={(birthday) => setInfo(c => {return {...c, birthday}})} />
        <Input label="Gênero" style={styles.input} value={info.gender} onChangeText={(gender) => setInfo(c => {return {...c, gender: gender as 'm' | 'f' | ''}})} />
        <Input label="CRM" style={styles.input} value={info.crm} onChangeText={(crm) => setInfo(c => {return {...c, crm: crm}})} />
        <Input label="Tipo de consulta" style={styles.input} value={info.consultType} onChangeText={(consultType) => setInfo(c => {return {...c, consultType: consultType}})} />
        <Input label="Valor da consulta presencial" style={styles.input} value={info.presentialConsultValue} onChangeText={(presentialConsultValue) => setInfo(c => {return {...c, presentialConsultValue: presentialConsultValue}})} />
        <Input label="Valor da consulta online" style={styles.input} value={info.onlineConsultValue} onChangeText={(onlineConsultValue) => setInfo(c => {return {...c, onlineConsultValue: onlineConsultValue}})} />
      </PageContainer>
      <View style={styles.actionsContainer}>
        <Button stretch onPress={updateDoctor}>Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20,
    paddingTop: 0
  },
  input: {
    marginTop: 16
  },
  actionsContainer: {
    padding: 20,
  }
});
