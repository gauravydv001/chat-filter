import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="login" onSubmit={handleSubmit} error={error} />
    </div>
  );
}