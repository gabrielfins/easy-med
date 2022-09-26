import { useState, useMemo } from 'react';
import { useAuth } from '../hooks/use-auth';
import { View, StyleSheet } from 'react-native';
import { PatientService } from '../services/patient-serivce';
import Button from '../components/Button';
import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import { BloodType } from '../types/blood-type';
import { useNavigate } from 'react-router-native';
import { Patient } from '../models/patient';

export default function PersonalInfo() {
  const { patient } = useAuth();
  
  const [info, setInfo] = useState<Patient>({
    birthday: patient?.birthday || '',
    cpf: patient?.cpf || '',
    email: patient?.email || '',
    id: patient?.id || '',
    name: patient?.name || '',
    bloodType: patient?.bloodType || '',
    gender: patient?.gender || '',
    height: patient?.height || '',
    phoneNumber: patient?.phoneNumber || '',
    weight: patient?.weight || ''
  });

  const patientService = useMemo(() => new PatientService(), []);

  const navigate = useNavigate();

  const updatePatient = async () => {
    if (!patient?.id) return;
    console.log(info)
    try {
      await patientService.update(patient.id , info);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <PageContainer style={styles.content} title="Informações Pessoais" returnTo="/settings">
        <Input label="Nome" style={styles.input} value={info.name} onChangeText={(name) => setInfo(c => {return {...c, name}})} />
        <Input label="CPF" style={styles.input} value={info.cpf} onChangeText={(cpf) => setInfo(c => {return {...c, cpf}})} />
        <Input label="Telefone" style={styles.input} value={info.phoneNumber} onChangeText={(phoneNumber) => setInfo(c => {return {...c, phoneNumber}})} />
        <Input label="Data de nascimento" style={styles.input} value={info.birthday} onChangeText={(birthday) => setInfo(c => {return {...c, birthday}})} />
        <Input label="Gênero" style={styles.input} value={info.gender} onChangeText={(gender) => setInfo(c => {return {...c, gender: gender as 'm' | 'f' | ''}})} />
        <Input label="Altura" style={styles.input} value={info.height?.toString()} onChangeText={(height) => setInfo(c => {return {...c, height: Number(height)}})} />
        <Input label="Peso" style={styles.input} value={info.weight?.toString()} onChangeText={(weight) => setInfo(c => {return {...c, weight: Number(weight)}})} />
        <Input label="Tipo sanguíneo" style={styles.input} value={info.bloodType} onChangeText={(bloodType) => setInfo(c => {return {...c, bloodType: bloodType as BloodType}})} />
      </PageContainer>
      <View style={styles.actionsContainer}>
        <Button stretch onPress={updatePatient}>Salvar</Button>
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
