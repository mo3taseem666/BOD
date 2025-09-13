import { useUserStore } from '@/utils/stores/user.store';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthSuccess() {
    const navigate = useNavigate();
    const login = useUserStore(state => state.login);

    function onLoginSuccess(data) {
        console.log(data);
        const { success, user, ...rest } = data;
        login({ ...rest, ...user });
        navigate('/');
    }

    return { onLoginSuccess };
}
