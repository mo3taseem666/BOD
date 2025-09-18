import { responseInitialValue } from '@/backend helper/configs/global';
import useUserApiLayer from './ApiLayer';
import Table from '@/components/common/table/Table';
import { usersColumns } from './configs';
import useIsOpen from '@/utils/hooks/global/useIsOpen';
import CreateUser from './CreateUser';
import usePagination from '@/utils/hooks/global/usePagination';
import { useState } from 'react';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

export default function Users() {
    const { isOpen, toggle } = useIsOpen();
    const { pagination, setPagination } = usePagination();

    const {
        userQuery: { data = responseInitialValue, isLoading, refresh }
    } = useUserApiLayer({ pagination });

    return (
        <div>
            <Table
                refresh={refresh}
                loading={isLoading}
                data={data.data}
                serverPagination={true}
                totalCount={data.pagination.total}
                columns={usersColumns}
                toggleModals={toggle}
                pagination={pagination}
                setPagination={setPagination}
            />
            {isOpen.add && <CreateUser onClose={toggle.add} />}
            {isOpen.edit && (
                <EditUser onClose={toggle.edit} oldData={isOpen.edit} />
            )}
            {isOpen.delete && (
                <DeleteUser setIsOpen={toggle.delete} id={isOpen.delete?._id} />
            )}
        </div>
    );
}
