import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import { useAuth } from '../../hooks/use-auth';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine-service';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';

export default function EditMedicine() {
  const { patient } = useAuth();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  const medicineService = useMemo(() => new MedicineService(), []);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    medicineService.get(id)
      .then((value) => {
        console.log(value)
        if (value) {
          setName(value.name);
          setTime(value.time);
          setFrequency(value.frequency);
          setDescription(value.description);
        }
      })
      .catch(console.log);
  }, []);

  const editMedicine = async () => {
    if (!id) return;

    const medicine: Medicine = {
      patientId: patient?.id || '',
      name,
      time,
      frequency,
      description
    };

    await medicineService.update(id, medicine);

    navigate('/medicines');
  };

  const deleteMedicine = async () => {
    if (!id) return;
    
    await medicineService.delete(id);
    navigate('/medicines');
  }

  return (
    <View style={styles.container}>
      <PageContainer style={styles.editMedicine} title="Medicamento" returnTo="/medicines">
        <TextInput mode="outlined" label="Nome" value={name} onChangeText={setName} />
        <View style={styles.vSeparator} />
        <TextInput mode="outlined" label="Horário" value={time} onChangeText={setTime} />
        <View style={styles.vSeparator} />
        <TextInput mode="outlined" label="Frequência" value={frequency} onChangeText={setFrequency} />
        <View style={styles.vSeparator} />
        <TextInput mode="outlined" label="Descrição" value={description} onChangeText={setDescription} />
        <View style={styles.vSeparator} />
      </PageContainer>
      <View style={styles.actionsContainer}>
        <Button stretch disabled={!name || !time || !frequency || !description} onPress={editMedicine}>Atualizar Medicamento</Button>
        <View style={styles.vSeparator} />
        <Button stretch error onPress={deleteMedicine}>Deletar Medicamento</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  editMedicine: {
    paddingHorizontal: 20,
    paddingTop: 12
  },
  vSeparator: {
    height: 8
  },
  actionsContainer: {
    marginBottom: 20,
    paddingHorizontal: 20
  }
});
