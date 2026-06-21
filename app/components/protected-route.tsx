import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '~/hooks/useAuth';

// Use as a layout route. Renders children only if authenticated.
export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Don't redirect while we're still checking the session, or you'll
    // bounce authenticated users to /login on every refresh.
    if (loading) {
        return <div className="grid h-screen place-items-center">Loading…</div>;
    }

    if (!user) {
        // Remember where they were headed so we can send them back after login.
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}