import { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import TopBar from './TopBar';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  returnTo?: string;
}

export default function PageContainer({children, title, returnTo}: PageContainerProps) {
  return (
    <>
      {title ? <TopBar title={title} returnTo={returnTo} /> : null}
      <ScrollView>
        {children}
      </ScrollView>
    </>
  );
}
