import { StyleSheet, View } from 'react-native';
import { Link, LinkProps } from 'react-router-native';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

interface DoctorCardProps extends LinkProps {
  title: string;
  description: string;
  info: string;
}

export default function DoctorCard({ title, description, info, ...props }: DoctorCardProps) {
  return (
    <Link style={styles.eventLink} underlayColor="#EAEAEA" {...props}>
      <>
        <View style={styles.iconContainer}>
          <MaterialIcons name="doctor" size={40} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <AppText size={18}>{title}</AppText>
          <AppText style={{color: '#6E6E6E'}}>{description}</AppText>
          <AppText size={12} style={{marginTop: 4}}>{info}</AppText>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons name="chevron-right" size={28} />
        </View>
      </>
    </Link>
  );
}

const styles = StyleSheet.create( {
  eventLink: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.secondary
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 18,
    justifyContent: 'center'
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
