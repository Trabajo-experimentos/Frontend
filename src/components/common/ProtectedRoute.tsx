import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export function ProtectedRoute({ redirectTo = '/login', children }: ProtectedRouteProps) {
  const { isAuthenticated, token } = useAuthStore();

  // Check both Zustand state and localStorage for token
  const localToken = localStorage.getItem('token');
  const hasValidAuth = isAuthenticated || (!!token && token !== '') || (!!localToken && localToken !== '');

  if (!hasValidAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
