import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/components/layout/Layout';
import { privateRoutes, puplicRoutes } from './routes';

export default function AppRoutes() {

    return (
        <Routes>
            {puplicRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                {privateRoutes.map(route => (
                    <Route
                        key={route.path}
                        index={route.index}
                        element={route.element}
                        path={route.path}
                    />
                ))}
            </Route>
        </Routes>
    );
}
