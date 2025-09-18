import useUsersApis from '@/backend helper/api calls/users.apis';
import { userKeys } from '@/backend helper/configs/queryKeys';
import { paginationConvertor, paginationKeyCreator } from '@/utils/funtiuons/global.fns';
import useCustomQuery from '@/utils/hooks/global/useCustomQuery';

export default function useUserApiLayer({ pagination } = {}) {
    const { getUsers } = useUsersApis();

    const userQuery = useCustomQuery({
        queryKey: [userKeys.users,paginationKeyCreator(pagination)],
        queryFn: () => getUsers(paginationConvertor(pagination))
    });

    return { userQuery };
}
