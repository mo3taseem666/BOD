import React from 'react';
import GET from '../api methods/GET';
import POST from '../api methods/POST';
import { userApis } from '../configs/urls';
import PUT from '../api methods/PUT';
import DELETE from '../api methods/DELETE';

export default function useUsersApis() {
    const get = GET();
    const post = POST();
    const put = PUT();
    const del = DELETE();

    async function getUsers(params) {
        return await get({ url: userApis.get, params });
    }

    async function getUser(id, params) {
        return await get({ url: `${userApis.get}/${id}`, params });
    }

    async function createUser(data) {
        return await post({ url: userApis.post, data });
    }

    async function updateUser(userData) {
        const { id, ...data } = userData;
        return await put({ url: `${userApis.put}/${id}`, data });
    }

    async function deleteUser(id) {
        return await del({ url: `${userApis.delete}/${id}` });
    }

    return { getUsers, createUser, getUser, updateUser, deleteUser };
}
