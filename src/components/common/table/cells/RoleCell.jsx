import React from 'react';

export default function RoleCell({ info }) {
    const role = info.getValue();
    const roleColors = {
        admin: 'bg-red-100 text-red-800 border-red-200',
        manager: 'bg-purple-100 text-purple-800 border-purple-200',
        user: 'bg-blue-100 text-blue-800 border-blue-200',
        staff: 'bg-green-100 text-green-800 border-green-200',
        viewer: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return (
        <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                roleColors[role] || roleColors.user
            }`}
        >
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
    );
}
