import { ReactNode } from 'react';
import { Navigate } from 'react-router-native';
import { useAuth } from '../hooks/use-auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { patient } = useAuth();

  console.log(patient);

  if (!patient) {
    return <Navigate to="/login" />
  }

  return <>{children}</>;
}
