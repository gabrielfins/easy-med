import { ReactNode } from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import AppText from './AppText';

export interface InputProps extends TextInputProps {
  label: string;
  preffix?: ReactNode;
  suffix?: ReactNode;
}

export default function Input({ label, style, preffix, suffix, ...props }: InputProps) {
  return (
    <View style={style}>
      <AppText>{label}</AppText>
      <View style={styles.inputContainer}>
        {preffix}
        <TextInput style={styles.input} {...props} />
        {suffix}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'OpenSans',
    height: 44,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 5
  },
  input: {
    height: '100%',
    flex: 1,
    paddingHorizontal: 12
  }
});
