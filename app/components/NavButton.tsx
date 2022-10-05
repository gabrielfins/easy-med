import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Link, LinkProps, useLocation } from 'react-router-native';
import { colors } from '../styles/colors';
import { Icon } from '../types/icon';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

interface NavButtonProps extends LinkProps {
  icon: Icon;
  activeIcon: Icon;
  children: string;
}

export default function NavButton({icon, activeIcon, ...props}: NavButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  
  return (
    <Link style={styles.navButton} underlayColor={colors.tertiary} {...props}>
      <>
        <MaterialIcons name={isActive ? activeIcon : icon} size={24} color={isActive ? colors.primary : 'black'} />
        <AppText style={isActive && styles.activeText} weight={isActive ? 'bold' : 'normal'}>{props.children}</AppText>
      </>
    </Link>
  );
}

const styles = StyleSheet.create({
  navButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12 
  },
  activeText: {
    color: colors.primary
  }
});
