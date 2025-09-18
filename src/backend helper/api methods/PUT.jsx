import useAxios from '@/configs/api/useAxios';
import { useUserStore } from '@/utils/stores/user.store';

export default function PUT() {
    const api = useAxios();
    const token = useUserStore(state => state.user?.token) || '';

    async function put({ url, data, isFormData = false }) {
        try {
            const res = await api.put(url, data, {
                headers: {
                    'Content-Type': isFormData
                        ? 'multipart/form-data'
                        : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(`response from ${url}`, res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw new Error(
                error.response?.data?.message || error.response?.data?.error?.[0]|| 'check error response'
            );
        }
    }

    return put;
}
