import React from 'react';
import POST from '../api methods/POST';
import { authApis } from '../configs/urls';


export default function useAuthApis() {
    const post = POST();

    async function loginFN(data) {
        return await post({ url: authApis.login, data });
    }

    return { loginFN };
}
