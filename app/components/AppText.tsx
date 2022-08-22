import { StyleSheet, Text, TextProps } from 'react-native';
import styled from 'styled-components/native';

interface AppTextProps extends TextProps {
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export default function AppText({size=14, weight=400, ...props}: AppTextProps) {
  const AppText = styled.Text`
    font-family: 'OpenSans';
    font-size: ${size}px;
    font-weight: ${weight};
  `;

  return <AppText {...props} />;
}
