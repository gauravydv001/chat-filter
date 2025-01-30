import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '@/types/index';

const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

    const login = async (username: string, password: string): Promise<void> => {
      const response = await axios.post<{ user: User }>('/api/auth/login', { username, password });
      setUser(response.data.user);
      router.push('/chat');
    };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('/api/auth/validate');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);