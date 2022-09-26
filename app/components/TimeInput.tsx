import { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import AppText from './AppText';

interface TimeInputProps {
  time?: string;
  onTimeChange?: (time: string) => void;
}

export default function TimeInput({ time, onTimeChange }: TimeInputProps) {
  const [hours, setHours] = useState<string>(time?.split(':')[0] ?? '00');
  const [minutes, setMinutes] = useState<string>(time?.split(':')[1] ?? '00');

  useEffect(() => {
    if (!onTimeChange) return;
    onTimeChange(`${hours}:${minutes}`);
  }, [hours, minutes]);

  useEffect(() => {
    setHours(time?.split(':')[0] ?? '00');
    setMinutes(time?.split(':')[1] ?? '00');
  }, [time]);

  const validateHours = () => {
    if (!hours) {
      setHours('00');
    } else if (Number(hours) > 23) {
      setHours('23');
    } else if (hours.includes('.') || hours.includes('-')) {
      setHours('00');
    } else if (hours.length === 1) {
      setHours(c => '0' + c);
    }
  };

  const validateMinutes = () => {
    if (!minutes) {
      setMinutes('00');
    } else if (Number(minutes) > 59) {
      setMinutes('59');
    } else if (minutes.includes('.') || minutes.includes('-')) {
      setMinutes('00');
    } else if (minutes.length === 1) {
      setMinutes(c => '0' + c);
    }
  };

  return (
    <View style={styles.timeInputContainer}>
      <TextInput
        style={styles.timeInput}
        maxLength={2}
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        onBlur={validateHours}
        selectTextOnFocus
        textContentType="none"
      />
      <AppText style={styles.timeInput}>:</AppText>
      <TextInput
        style={styles.timeInput}
        maxLength={2}
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="numeric"
        onBlur={validateMinutes}
        selectTextOnFocus
        textContentType="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  timeInput: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginHorizontal: 8,
    fontFamily: 'OpenSans',
    fontSize: 32
  }
});
