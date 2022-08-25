import { StyleSheet, View } from 'react-native';
import { Link, LinkProps } from 'react-router-native';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

interface ProfileLinkProps extends LinkProps {
  title: string;
  description?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function ProfileLink({title, description, icon, ...props}: ProfileLinkProps) {
  return (
    <Link style={styles.profileButton} underlayColor={colors.tertiary} {...props}>
      <>
        {icon ? <MaterialIcons name={icon} size={32} /> : null}
        <View style={styles.textContent}>
          <AppText size={16}>{title}</AppText>
          {description ? <AppText style={styles.description}>{description}</AppText> : null}
        </View>
      </>
    </Link>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  textContent: {
    marginLeft: 20,
    display: 'flex'
  },
  description: {
    color: '#6E6E6E'
  }
});
