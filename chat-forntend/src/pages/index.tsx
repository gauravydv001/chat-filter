import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react'; // Add this import

export default function Home() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/chat');
        } else {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return null;
}
