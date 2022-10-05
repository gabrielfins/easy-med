import { StyleSheet, View } from 'react-native';
import { Link, LinkProps } from 'react-router-native';
import { colors } from '../styles/colors';
import { Icon } from '../types/icon';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface EventLinkProps extends LinkProps {
  icon: Icon;
  description: string;
  title: string;
  info: string;
}

export default function EventLink({icon, description, title, info, ...props}: EventLinkProps) {
  return (
    <Link style={styles.eventLink} underlayColor="#EAEAEA" {...props}>
      <>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={40} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}>
            <AppText size={12} style={{color: '#6E6E6E'}}>{description}</AppText>
            <AppText>{title}</AppText>
          </View>
          <AppText size={12} style={{color: '#6E6E6E'}}>{info}</AppText>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons name="chevron-right" size={28} />
        </View>
      </>
    </Link>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 5,
    backgroundColor: colors.secondary
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 10
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
