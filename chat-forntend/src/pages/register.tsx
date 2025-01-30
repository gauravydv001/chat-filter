import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (username: string, password: string) => {
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      await login(username, password);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="register" onSubmit={handleSubmit} error={error} />
    </div>
  );
}