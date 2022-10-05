import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { onValue } from 'firebase/database';
import { useAuth } from '../../hooks/use-auth';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine-service';
import PageContainer from '../../components/PageContainer';
import EventLink from '../../components/EventLink';
import EmptyMedicines from './EmptyMedicines';
import Button from '../../components/Button';
import Empty from '../../components/Empty';


export default function Medicines() {
  const { patient } = useAuth();
  const [medicines, setMedicines] = useState<Record<string, Medicine> | null>();
  
  const medicineService = useMemo(() => new MedicineService(), []);
  
  useEffect(() => {
    const unsubscribe = onValue(medicineService.watch(patient?.id || ''), (snapshot) => {
      setMedicines(snapshot.val());
    });

    return unsubscribe;
  }, []);

  if (medicines === undefined) {
    return <Empty />;
  }

  if (medicines === null) {
    return <EmptyMedicines />;
  }

  return (
    <View style={styles.container}>
      <PageContainer title="Medicamentos" returnTo="/profile">
        <View style={styles.group}>
          {medicines ? Object.entries(medicines).map(([key, value], index) => (
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
          )) : null}
        </View>
      </PageContainer>
      <View style={styles.buttonContainer}>
        <Button type="tonal" stretch icon="plus" link to="/medicines/new">Novo Medicamento</Button>
      </View>
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
