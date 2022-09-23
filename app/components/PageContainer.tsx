import { ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import TopBar from './TopBar';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  returnTo?: string;
  style?: StyleProp<ViewStyle>;
}

export default function PageContainer({children, title, returnTo, style}: PageContainerProps) {
  return (
    <>
      {title ? <TopBar title={title} returnTo={returnTo} /> : null}
      <ScrollView style={style}>
        {children}
      </ScrollView>
    </>
  );
}
