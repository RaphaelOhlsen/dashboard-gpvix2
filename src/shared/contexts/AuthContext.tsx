import {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react';

import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
  isAuthenticated: boolean;
  role: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
const LOCAL_STORAGE_KEY__ROLE = 'APP_ROLE';
interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const role = localStorage.getItem(LOCAL_STORAGE_KEY__ROLE);

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    if (role) {
      setRole(JSON.parse(role));
    } else {
      setRole('user');
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ROLE,
        JSON.stringify(result.role)
      );
      setAccessToken(result.accessToken);
      setRole(result.role);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY__ROLE);
    setAccessToken(undefined);
    setRole('user');
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  
  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        role,
        login: handleLogin, 
        logout: handleLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
