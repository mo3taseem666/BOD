import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ToastContainer autoClose={1000} />
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    );
}
