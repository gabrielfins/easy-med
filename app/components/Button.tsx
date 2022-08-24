import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  type?: 'flat' | 'tonal';
  size?: 'regular' | 'large';
  icon?: keyof typeof MaterialIcons.glyphMap;
  children: string;
}

export default function Button({type='flat', size='regular', icon, children, ...props}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        type === 'tonal' ? styles.buttonTonal : null,
        size === 'large' ? styles.buttonLarge : null
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <>
        {icon ? (
          <MaterialIcons
            name={icon}
            size={size === 'regular' ? 24 : 28}
            color={type === 'flat' ? colors.white : colors.primary} />
          ) : null
        }
        <AppText
          style={[
            styles.buttonText,
            type === 'tonal' ? styles.buttonTextTonal : null, icon ? styles.withMargin : null
          ]}
          size={size === 'large' ? 18 : 16}
          weight="bold"
        >{children}</AppText>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  buttonTonal: {
    backgroundColor: colors.secondary
  },
  buttonLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  buttonText: {
    color: colors.white
  },
  buttonTextTonal: {
    color: colors.primary
  },
  withMargin: {
    marginLeft: 8
  }
});
