import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import NameEmailCell from '@/components/common/table/cells/NameEmailCell';
import RoleCell from '@/components/common/table/cells/RoleCell';
import DateCell from '@/components/common/table/cells/DateCell';

const columnHelper = createColumnHelper();

export const usersColumns = [    
    columnHelper.accessor('username', {
        header: 'Username',
        cell: info => <NameEmailCell info={info} />,
    }),
    
    columnHelper.accessor('role', {
        header: 'Role',
        cell: info => <RoleCell info={info} />
    }),
    columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: info => <DateCell info={info} />,
        enableColumnFilter : false
    }),
    columnHelper.accessor('updatedAt', {
        header: 'Updated At',
        cell: info => <DateCell fullDate={true} info={info} />,
        enableColumnFilter : false
    })
]

export const userFields = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter username',
        editMode : true,
        viewMode : true
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        editMode : false,
        viewMode : true
    },
    {
        name: 'role',
        label: 'Role',
        type: 'select',
        optionsKey: 'roles',
        placeholder: 'Select role',
        editMode : true,
        viewMode : true
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        editMode : false,
        viewMode : false
    }
]
