import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useNavigate } from 'react-router-native';
import { colors } from '../styles/colors';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface DefaultButtonProps extends TouchableOpacityProps {
  type?: 'flat' | 'tonal';
  size?: 'regular' | 'large';
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: true;
  stretch?: true;
  children: string;
}

type ButtonProps = DefaultButtonProps & (
  {
    link: true;
    to: string;
    onPress?: never
  } | {
    link?: never;
    to?: never;
    onPress?: Function
  }
);

export default function Button({type='flat', size='regular', link, to='', error, icon, children, onPress, stretch, ...props}: ButtonProps) {
  const navigate = useNavigate();

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        type === 'tonal' ? styles.buttonTonal : null,
        size === 'large' ? styles.buttonLarge : null,
        stretch ? styles.buttonStretch : null,
        props.disabled ? styles.buttonDisabled : null,
        error ? styles.buttonError : null
      ]}
      activeOpacity={0.7}
      onPress={link ? () => navigate(to) : onPress}
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
  );
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
  buttonDisabled: {
    backgroundColor: '#DEDEDE'
  },
  buttonText: {
    color: colors.white
  },
  buttonTextTonal: {
    color: colors.primary
  },
  buttonError: {
    backgroundColor: colors.error
  },
  buttonStretch: {
    width: '100%'
  },
  withMargin: {
    marginLeft: 8
  }
});
