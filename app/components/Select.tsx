import { useState } from 'react';
import { View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import AppText from './AppText';
import Input, { InputProps } from './Input';

interface SelectProps extends InputProps {
  options: Array<{value: any, text: string}>;
}

export default function Select({ label, options, ...props }: SelectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState(props.value);

  const changeValue = (value: string) => {
    setValue(value);
    setShowDropdown(false);
  };
  
  return (
    <View style={styles.select}>
      <Input label={label} value={value} showSoftInputOnFocus={false} onFocus={() => setShowDropdown(true)} />
      {showDropdown ? (
        <ScrollView style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableHighlight key={index} style={styles.option} underlayColor={colors.secondary} onPress={() => changeValue(option.value)}>
              <AppText>{option.text}</AppText>
            </TouchableHighlight>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    maxHeight: 150,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C8C8',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 100
  },
  option: {
    height: 30,
    paddingHorizontal: 8,
    justifyContent: 'center'
  }
});
