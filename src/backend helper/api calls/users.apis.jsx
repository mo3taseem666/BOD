import React from 'react';
import GET from '../api methods/GET';
import POST from '../api methods/POST';
import { userApis } from '../configs/urls';

export default function useUsersApis() {
    const get = GET();
    const post = POST();

    async function getUsers(params) {
        return await get({ url: userApis.get, params })
    }

    async function getUser(id, params) {
        return await get({ url: `${userApis.get}/${id}`, params });
    }

    async function createUser(data) {
        return await post({ url: userApis.post, data });
    }

    return { getUsers, createUser, getUser };
}
