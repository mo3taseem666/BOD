import React from 'react';
import DeleteModal from '@/components/common/form/DeleteModal';
import useUsersApis from '@/backend helper/api calls/users.apis';
import useCustomMutation from '@/utils/hooks/global/useCustomMutation';
import { userKeys } from '@/backend helper/configs/queryKeys';
import { successMsg } from '@/backend helper/handlers/successHandler';
import { errorHanlder } from '@/backend helper/handlers/errorHandler';

export default function DeleteUser({ setIsOpen, loading, id }) {
    const { deleteUser: deleteFn } = useUsersApis();

    const onSuccess = () => {
        successMsg('User deleted successfully');
        setIsOpen(false);
    };

    const onError = (error) => {
        errorHanlder(error.message);
    };


    const { mutate, isPending } = useCustomMutation({
        mutationFn: deleteFn,
        queryKeys: [userKeys.users],
        onSuccess,
        onError
    });

    return (
        <DeleteModal
            deleteFn={() => mutate(id)}
            setIsOpen={setIsOpen}
            loading={isPending}
        />
    );
}
