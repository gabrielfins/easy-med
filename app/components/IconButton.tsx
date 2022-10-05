import { TouchableHighlight, TouchableHighlightProps, StyleSheet } from 'react-native';
import { Icon } from '../types/icon';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IconButtonProps extends TouchableHighlightProps {
  icon: Icon;
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <TouchableHighlight style={styles.iconButton} underlayColor={colors.tertiary} {...props}>
      <MaterialIcons name={icon} size={24} color="#5f5f5f" />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent'
  }
});
