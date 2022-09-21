import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface EmptyStateIconProps {
  icon: ImageSourcePropType;
}

export default function EmptyStateIcon({ icon }: EmptyStateIconProps) {
  return (
    <View style={styles.emptyStateIcon}>
      <Image style={styles.icon} source={icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    height: 230,
    marginBottom: 60,
    borderRadius: 110,
    backgroundColor: colors.secondary
  },
  icon: {
    width: 275,
    height: 275
  }
});
