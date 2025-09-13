import useAxios from '@/configs/api/useAxios';
import { useUserStore } from '@/utils/stores/user.store';

export default function POST() {
    const api = useAxios();
    const token = useUserStore(state => state.token);

    async function post({ url, data, isFormData = false }) {
        try {
            const res = await api.post(url, data, {
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
            console.log(error.response?.data?.message);
            throw new Error(
                error.response?.data?.message || 'check error response'
            );
        }
    }

    return post;
}
