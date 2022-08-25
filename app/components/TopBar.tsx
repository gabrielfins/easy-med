import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface TopBarProps {
  title: string;
  returnTo?: string;
}

export default function TopBar({title, returnTo}: TopBarProps) {
  return (
    <View style={styles.topBar}>
      {returnTo ? (
        <Link style={styles.topBarItem} to={returnTo} underlayColor={'#EAEAEA'}>
          <MaterialIcons name="chevron-left" size={32} />
        </Link>
      ) : (
        <View style={styles.topBarItem} />
      )}
      <AppText size={20} weight="bold">{title}</AppText>
      <View style={styles.topBarItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10
  },
  topBarItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
