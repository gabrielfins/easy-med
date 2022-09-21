import { Link, LinkProps } from 'react-router-native';
import { colors } from '../styles/colors';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

interface EventLink2Props extends LinkProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

export default function EventLink2({icon, title, ...props}: EventLink2Props) {
  return (
    <Link style={styles.eventLink} underlayColor= {colors.tertiary} {...props}>
      <>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={40} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}>
            <AppText size={16}>{title}</AppText>
          </View>
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
    position: 'relative'

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
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 23
    
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});