import { TouchableHighlight, TouchableHighlightProps, StyleSheet } from 'react-native';
import { Icon } from '../types/icon';
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigate } from 'react-router-native';

interface DefaultIconButtonProps extends TouchableHighlightProps {
  icon: Icon;
  underlayColor?: string;
}

type IconButtonProps = DefaultIconButtonProps & (
  {
    link: true;
    to: string;
    onPress?: never;
  } | {
    link?: never;
    to?: string;
    onPress?: Function;
  }
);

export default function IconButton({ icon, underlayColor, link, to='', onPress, ...props }: IconButtonProps) {
  const navigate = useNavigate();

  return (
    <TouchableHighlight
      style={styles.iconButton}
      underlayColor={underlayColor ? underlayColor : colors.tertiary}
      onPress={link ? () => navigate(to) : onPress}
      {...props}
    >
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
