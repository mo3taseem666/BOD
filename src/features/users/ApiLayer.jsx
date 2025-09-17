import useUsersApis from '@/backend helper/api calls/users.apis';
import { userKeys } from '@/backend helper/configs/queryKeys';
import useCustomQuery from '@/utils/hooks/global/useCustomQuery';

export default function useUserApiLayer() {
    const { getUsers } = useUsersApis();
    
    const userQuery = useCustomQuery({
        queryKey: [userKeys.users],
        queryFn: () => getUsers()
    });

    return { userQuery };
}
