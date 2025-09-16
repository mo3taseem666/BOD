import LoginForm from '@/components/auth/login/LoginForm';
import Logo from '@/components/common/Logo';

export default function Login() {
    return (
        <div className="bg-gray-100 gap-2 font-montserrat h-screen flex flex-col justify-center items-center">
            <Logo />
            <p className="text-3xl font-semibold text-gray-700">
                Sign in to your account
            </p>
            <p className="mb-6 font-medium text-gray-500">
                Welcome back to BOD Dashboard
            </p>
            <LoginForm />
            <p className="text-xs text-gray-500 text-center mt-4">
                © {new Date().getFullYear()} BOD Development Consulting. All
                rights reserved.
            </p>
        </div>
    );
}
