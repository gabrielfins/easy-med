import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { useAuth } from '../../hooks/use-auth';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine-service';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import Input from '../../components/Input';
import TimeInput from '../../components/TimeInput';
import { useKeyboard } from '../../hooks/use-keyboard';

export default function EditMedicine() {
  const { patient } = useAuth();

  const [medicine, setMedicine] = useState<Medicine>();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  const medicineService = useMemo(() => new MedicineService(), []);

  const navigate = useNavigate();
  const { id } = useParams();

  const { isKeyboardVisible } = useKeyboard();

  useEffect(() => {
    if (!id) return;

    medicineService.get(id)
      .then((value) => {
        if (!value) return;
        setMedicine(value);
        setName(value.name);
        setTime(value.time);
        setFrequency(value.frequency);
        setDescription(value.description);
      })
      .catch(console.log);
  }, []);

  const editMedicine = async () => {
    if (!id) return;

    try {
      const newMedicine: Medicine = {
        patientId: patient?.id || '',
        name,
        time,
        frequency,
        description,
        startDate: medicine?.startDate || new Date().toISOString()
      };
  
      await medicineService.update(id, newMedicine);
  
      navigate('/medicines');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMedicine = async () => {
    if (!id) return;
    
    try {
      await medicineService.delete(id);
      navigate('/medicines');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <PageContainer style={styles.content} title="Medicamento" returnTo="/medicines">
        <TimeInput time={time} onTimeChange={setTime} />
        <Input label="Nome" style={styles.input} value={name} onChangeText={setName} />
        <Input label="Frequência" style={styles.input} value={frequency} onChangeText={setFrequency} />
        <Input label="Descrição" style={styles.input} value={description} onChangeText={setDescription} />
      </PageContainer>
      {!isKeyboardVisible ? (
        <View style={styles.actionsContainer}>
          <Button stretch disabled={!name || !time || !frequency || !description} onPress={editMedicine}>Atualizar Medicamento</Button>
          <View style={styles.vSeparator} />
          <Button stretch error onPress={deleteMedicine}>Deletar Medicamento</Button>
        </View>
      ) : null}
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
  vSeparator: {
    height: 16
  },
  actionsContainer: {
    padding: 20,
  }
});
