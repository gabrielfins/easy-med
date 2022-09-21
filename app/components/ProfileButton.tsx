import { StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from 'react-native';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

interface ProfileButtonProps extends TouchableHighlightProps {
  title: string;
  description?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function ProfileButton({title, description, icon, ...props}: ProfileButtonProps) {
  return (
    <TouchableHighlight style={styles.profileButton} underlayColor={colors.tertiary} {...props}>
      <>
        {icon ? <MaterialIcons name={icon} size={32} /> : null}
        <View style={styles.textContent}>
          <AppText size={16}>{title}</AppText>
          {description ? <AppText style={styles.description}>{description}</AppText> : null}
        </View>
      </>
    </TouchableHighlight>
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
