import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigate } from "react-router-native";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import { useAuth } from "../../hooks/use-auth";
import { Medicine } from "../../models/medicine";
import { MedicineService } from "../../services/medicine-service";

export default function NewMedicine() {
  const { patient } = useAuth();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  const medicineService = useMemo(() => new MedicineService(), []);

  const navigate = useNavigate();

  const pushMedicine = async () => {
    const medicine: Medicine = {
      patientId: patient?.id || '',
      name,
      time,
      frequency,
      description
    };

    await medicineService.add(medicine);

    navigate('/medicines');
  };

  return (
    <View style={styles.container}>
      <PageContainer style={styles.newMedicine} title="Novo Medicamento" returnTo="/medicines">
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
        <Button stretch disabled={!name || !time || !frequency || !description} onPress={pushMedicine}>Cadastrar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  newMedicine: {
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
