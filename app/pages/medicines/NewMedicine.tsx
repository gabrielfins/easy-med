import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../../hooks/use-auth';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine-service';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import Input from '../../components/Input';
import TimeInput from '../../components/TimeInput';
import { useKeyboard } from '../../hooks/use-keyboard';

export default function NewMedicine() {
  const { patient } = useAuth();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  const medicineService = useMemo(() => new MedicineService(), []);

  const navigate = useNavigate();

  const { isKeyboardVisible } = useKeyboard();

  const pushMedicine = async () => {
    try {
      const medicine: Medicine = {
        patientId: patient?.id || '',
        name,
        time,
        frequency,
        description,
        startDate: new Date().toISOString()
      };
  
      await medicineService.add(medicine);
  
      navigate('/medicines');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <PageContainer style={styles.content} title="Novo Medicamento" returnTo="/medicines">
        <TimeInput onTimeChange={setTime} />
        <Input label="Nome" style={styles.input} value={name} onChangeText={setName} />
        <Input label="Frequência" style={styles.input} value={frequency} onChangeText={setFrequency} />
        <Input label="Descrição" style={styles.input} value={description} onChangeText={setDescription} />
      </PageContainer>
      {!isKeyboardVisible ? (
        <View style={styles.actionsContainer}>
          <Button stretch disabled={!name || !time || !frequency || !description} onPress={pushMedicine}>Cadastrar</Button>
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
    marginTop : 16
  },
  actionsContainer: {
    padding: 20,
  }
});
