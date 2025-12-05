import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Configure API base URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

axios.defaults.baseURL = API_BASE_URL;

interface AuthContextType {
  token: string | null;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = localStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login to:', '/api/auth/login');
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('Login response:', response.data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      console.log('Attempting registration to:', '/api/auth/register');
      console.log('Registration data:', data);
      const response = await axios.post('/api/auth/register', data);
      console.log('Registration response:', response.data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
