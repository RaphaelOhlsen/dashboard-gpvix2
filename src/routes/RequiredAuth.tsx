import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useAuthContext } from '../shared/contexts';

interface RequireAuthProps {
  allowedRoles: string[];
}

export const RequireAuth: FC<RequireAuthProps> = ({allowedRoles}) => {
  const { role } = useAuthContext();
  const location = useLocation();
  
  return  allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to='/home' state={{ from: location }} replace />
  );
};



