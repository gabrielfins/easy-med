import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import AppText from './AppText';

export interface InputProps extends TextInputProps {
  label: string;
}

export default function Input({ label, style, ...props }: InputProps) {
  return (
    <View style={style}>
      <AppText>{label}</AppText>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'OpenSans',
    height: 44,
    marginTop: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 5
  }
});
