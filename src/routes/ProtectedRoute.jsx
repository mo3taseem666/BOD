import { useUserStore } from '@/utils/stores/user.store';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = useUserStore(state => state.isAuthanticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
