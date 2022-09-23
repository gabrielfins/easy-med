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
    if (user === undefined) {
      navigate('/empty');
    } else if (user === null) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [user]);

  return <>{children}</>;
}
