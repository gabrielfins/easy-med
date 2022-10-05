import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors } from '../styles/colors';
import { useNavigate } from 'react-router-native';
import { Icon } from '../types/icon';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ShortcutButtonProps extends TouchableOpacityProps {
  children: string;
  icon: Icon;
  to: string;
}

export default function ShortcutButton({children, icon, to, ...props}: ShortcutButtonProps) {
  const navigate = useNavigate();

  return (
    <TouchableOpacity style={styles.shortcutButton} activeOpacity={0.7} onPress={() => navigate(to)} {...props}>
      <>
        <MaterialIcons name={icon} size={28} color={colors.primary} />
        <AppText weight="bold" style={{color: colors.primary}}>{children}</AppText>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  shortcutButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    backgroundColor: colors.secondary
  }
});
