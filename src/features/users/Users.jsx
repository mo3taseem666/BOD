import { responseInitialValue } from '@/backend helper/configs/global';
import useUserApiLayer from './ApiLayer';
import Table from '@/components/common/table/Table';
import { createColumnHelper } from '@tanstack/react-table';

export default function Users() {
    const {
        userQuery: { data = responseInitialValue, isLoading }
    } = useUserApiLayer();

    console.log('data', data);
    console.log('isLoading', isLoading);
    const columnHelper = createColumnHelper();

    function onChange(data) {
        console.log('filters', data);
    }

    return (
        <div className="">
            <Table
                // onServerAction={onChange}
                loading={isLoading}
                data={[
                    {
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },
                    {
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },
                    {
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },{
                        id: 1,
                        name: 'Sarah Johnson',
                        email: 'sarah.johnson@company.com',
                        role: 'manager',
                        department: 'Engineering',
                        status: 'active',
                        createdAt: '2024-11-03',
                        salary: 74200,
                        performance: 88
                    },
                    {
                        id: 2,
                        name: 'David Miller',
                        email: 'david.miller@company.com',
                        role: 'editor',
                        department: 'Finance',
                        status: 'pending',
                        createdAt: '2025-03-19',
                        salary: 126400,
                        performance: 67
                    },
                ]}
                // serverPagination={data.pagination}
                // columns={[
                //     columnHelper.accessor('_id', {
                //         header: 'ID',
                //         cell: info => info.getValue()
                //     }),
                //     columnHelper.accessor('username', {
                //         header: 'Username',
                //         cell: info => info.getValue()
                //     }),
                //     columnHelper.accessor('email', {
                //         header: 'Email',
                //         cell: info => info.getValue()
                //     }),
                //     columnHelper.accessor('role', {
                //         header: 'Role',
                //         cell: info => info.getValue()
                //     }),
                //     columnHelper.accessor('createdAt', {
                //         header: 'Created At',
                //         cell: info => new Date(info.getValue()).toLocaleString() // formatted datetime
                //     }),
                //     columnHelper.accessor('updatedAt', {
                //         header: 'Updated At',
                //         cell: info => new Date(info.getValue()).toLocaleString()
                //     })
                // ]}
                // data={data.data}
            />
        </div>
    );
}
