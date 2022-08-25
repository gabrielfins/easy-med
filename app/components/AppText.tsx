import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface AppTextProps extends TextProps {
  size?: number;
  weight?: 'normal' | 'bold';
}

export default function AppText({size=14, weight='normal', ...props}: AppTextProps) {
  const AppText = styled.Text`
    font-family: ${weight === 'normal' ? 'OpenSans' : 'OpenSansBold'};
    font-size: ${size}px;
  `;

  return <AppText {...props} />;
}
