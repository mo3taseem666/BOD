import Table from '@/components/common/table/Table';
import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import NameCell from '@/components/common/table/cells/NameCell';

export default function Users() {
    const columnHelper = createColumnHelper();

    const productsData = [
        {
            id: 1,
            name: 'iPhone 15 Pro',
            category: 'Electronics',
            price: 999,
            stock: 50,
            rating: 4.8,
            isActive: true,
            createdAt: '2024-01-15T10:00:00Z'
        },
        {
            id: 2,
            name: 'MacBook Air M2',
            category: 'Computers',
            price: 1299,
            stock: 25,
            rating: 4.9,
            isActive: true,
            createdAt: '2024-01-20T14:30:00Z'
        }
        // ... more products
    ];

    const customColumns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'Product ID',
                size: 100,
                cell: info => (
                    <span className="font-mono text-blue-600 font-semibold">
                        #{info.getValue()}
                    </span>
                )
            }),

            columnHelper.accessor('name', {
                header: 'Product Name',
                cell: info => <NameCell name={info} />
            }),
            columnHelper.accessor('category', {
                header: 'Category',
                cell: info => (
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        {info.getValue()}
                    </span>
                )
            }),

            columnHelper.accessor('price', {
                header: 'Price',
                cell: info => (
                    <div className="text-lg font-bold text-green-600">
                        ${info.getValue().toLocaleString()}
                    </div>
                )
            }),

            columnHelper.accessor('stock', {
                header: 'Stock',
                cell: info => {
                    const stock = info.getValue();
                    const isLowStock = stock < 20;
                    return (
                        <div
                            className={`flex items-center space-x-2 ${
                                isLowStock ? 'text-red-600' : 'text-green-600'
                            }`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    isLowStock ? 'bg-red-500' : 'bg-green-500'
                                }`}
                            />
                            <span className="font-medium">{stock} units</span>
                        </div>
                    );
                }
            }),

            columnHelper.accessor('rating', {
                header: 'Rating',
                cell: info => {
                    const rating = info.getValue();
                    return (
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={
                                        i < Math.floor(rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }
                                >
                                    ⭐
                                </span>
                            ))}
                            <span className="ml-1 text-sm text-gray-600">
                                ({rating})
                            </span>
                        </div>
                    );
                }
            }),

            columnHelper.accessor('isActive', {
                header: 'Status',
                cell: info => (
                    <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                            info.getValue()
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                    >
                        {info.getValue() ? 'Active' : 'Inactive'}
                    </span>
                )
            }),

            columnHelper.accessor('createdAt', {
                header: 'Created Date',
                cell: info => {
                    const date = new Date(info.getValue());
                    return (
                        <div className="text-sm text-gray-600">
                            {date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    );
                }
            })
        ],
        []
    );

    return (
        <div className=" overflow-x-auto">
            <Table
                title='Users'
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
                className="shadow-lg"
            />
        </div>
    );
}
