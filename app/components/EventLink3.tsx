import { Link, LinkProps } from 'react-router-native';
import AppText from './AppText';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
interface EventLink3Props extends LinkProps {
  title: string;
  info: string;
}

export default function EventLink3({title, info,  ...props}: EventLink3Props) {
  return (
    <Link style={styles.eventLink} underlayColor={colors.tertiary} {...props}>
      <>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}>
            <AppText size={16}>{title}</AppText>
            <AppText size={12} style={{color: '#6E6E6E'}}>{info}</AppText>
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
    paddingLeft: 10,
    paddingRight: 10
  },

  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20
  },

  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});