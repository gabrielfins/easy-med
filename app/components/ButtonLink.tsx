import { StyleSheet } from 'react-native';
import { Link, LinkProps } from 'react-router-native';
import { colors } from '../styles/colors';
import AppText from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ButtonLinkProps extends LinkProps {
  type?: 'flat' | 'tonal';
  size?: 'regular' | 'large';
  icon?: keyof typeof MaterialIcons.glyphMap;
  children: string;
}

export default function Button({type='flat', size='regular', icon, children, ...props}: ButtonLinkProps) {
  return (
    <Link
      style={[
        styles.button, 
        type === 'tonal' ? styles.buttonTonal : null,
        size === 'large' ? styles.buttonLarge : null
      ]}
      underlayColor={type === 'flat' ? colors.primaryTransparent : colors.secondaryTransparent}
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
    </Link>
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
