import useAxios from '@/configs/api/useAxios';
import { useUserStore } from '@/utils/stores/user.store';

export default function DELETE() {
    const api = useAxios();
    const token = useUserStore(state => state.user?.token) || '';

    async function deleteFn({ url }) {
        try {
            const res = await api.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(`response from ${url}`, res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw new Error(
                error.response?.data?.message ||
                    error.response?.data?.error?.[0] ||
                    'check error response'
            );
        }
    }

    return deleteFn;
}
