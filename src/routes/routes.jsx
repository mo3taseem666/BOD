import Home from '@/features/home/Home';
import Login from '@/features/auth/Login';
import Users from '@/features/users/Users';

export const routes = [
    { path: 'login', element: <Login />, isPuplic: true },
    { path: '/', element: <Home />, index: true },
    { path: '/users', element: <Users />, isPuplic: false },
];

export const puplicRoutes = routes.filter(el => el.isPuplic);
export const privateRoutes = routes.filter(el => !el.isPuplic);
