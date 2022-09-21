import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../hooks/use-auth';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user]);

  return <>{children}</>;
}