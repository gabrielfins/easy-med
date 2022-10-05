import { useState } from 'react';
import { View } from 'react-native';

interface Option {
  label: string;
  value: any;
}

interface SelectProps {
  options: Option[];
}

export default function Select({ options }: SelectProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectOptions, setSelectOptions] = useState(options);

  return (
    <View>

    </View>
  );
}
