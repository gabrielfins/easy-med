import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface AppTextProps extends TextProps {
  size?: number;
  weight?: 'normal' | 'bold';
}

export default function AppText({size=14, weight='normal', ...props}: AppTextProps) {
  const AppText = styled.Text`
    font-family: 'OpenSans';
    font-size: ${size}px;
    font-weight: ${weight};
  `;

  return <AppText {...props} />;
}
