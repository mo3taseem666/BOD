import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper
} from '@tanstack/react-table';
import {
    MdChevronLeft,
    MdChevronRight,
    MdFirstPage,
    MdLastPage,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdRefresh,
    MdExpandMore,
    MdExpandLess,
    MdClose,
    MdSettings,
    MdFileDownload,
    MdTableChart,
    MdPrint,
    MdFullscreen,
    MdFullscreenExit,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdMoreVert,
    MdEdit,
    MdDelete,
    MdContentCopy,
    MdAdd,
    MdViewColumn,
    MdSwapVert,
    MdShare,
    MdInfo
} from 'react-icons/md';

// Enhanced mock data

const UltimateDataTable = ({
    data,
    columns: externalColumns,
    onServerAction,
    loading = false,
    serverPagination = false,
    totalCount = data?.length || 0,
    className = '',
    title = 'Data Table',
    enableRowSelection = true,
    enableExport = true,
    onRowClick,
    customActions = []
}) => {
    // Core state

    console.log('LOGGED');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    // UI state
    const [showColumnSettings, setShowColumnSettings] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [density, setDensity] = useState('normal');

    const tableRef = useRef(null);

    // Enhanced columns with selection
    const columnHelper = createColumnHelper();
    const defaultColumns = useMemo(() => {
        const baseColumns = [
            // Selection column
            columnHelper.display({
                id: 'select',
                size: 50,
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={table.getIsAllRowsSelected()}
                            ref={input => {
                                if (input)
                                    input.indeterminate =
                                        table.getIsSomeRowsSelected();
                            }}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                )
            }),

            // ID column
            columnHelper.accessor('id', {
                header: 'ID',
                size: 80,
                cell: info => (
                    <div className="font-mono text-sm font-medium text-blue-600">
                        #{info.getValue()}
                    </div>
                )
            }),

            // Name column
            columnHelper.accessor('name', {
                header: 'Employee',
                cell: info => {
                    const row = info.row.original;
                    const initials = info
                        .getValue()
                        .split(' ')
                        .map(n => n[0])
                        .join('');
                    return (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {initials}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">
                                    {info.getValue()}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {row.email}
                                </div>
                            </div>
                        </div>
                    );
                }
            }),

            // Role column
            columnHelper.accessor('role', {
                header: 'Role',
                cell: info => {
                    const role = info.getValue();
                    const roleColors = {
                        admin: 'bg-red-100 text-red-800 border-red-200',
                        manager:
                            'bg-purple-100 text-purple-800 border-purple-200',
                        user: 'bg-blue-100 text-blue-800 border-blue-200',
                        editor: 'bg-green-100 text-green-800 border-green-200',
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
            }),

            // Department column
            columnHelper.accessor('department', {
                header: 'Department',
                cell: info => (
                    <div className="text-sm text-gray-700 font-medium">
                        {info.getValue()}
                    </div>
                )
            }),

            // Status column
            columnHelper.accessor('status', {
                header: 'Status',
                cell: info => {
                    const status = info.getValue();
                    const statusColors = {
                        active: 'bg-green-100 text-green-800 border-green-200',
                        inactive: 'bg-red-100 text-red-800 border-red-200',
                        pending:
                            'bg-yellow-100 text-yellow-800 border-yellow-200',
                        archived: 'bg-gray-100 text-gray-800 border-gray-200'
                    };
                    const dotColor = {
                        active: 'bg-green-500',
                        inactive: 'bg-red-500',
                        pending: 'bg-yellow-500',
                        archived: 'bg-gray-500'
                    };
                    return (
                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-2 h-2 rounded-full ${dotColor[status]}`}
                            />
                            <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                                    statusColors[status] || statusColors.pending
                                }`}
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </span>
                        </div>
                    );
                }
            }),

            // Salary column
            columnHelper.accessor('salary', {
                header: 'Salary',
                cell: info => (
                    <div className="text-sm font-medium text-green-600">
                        ${info.getValue()?.toLocaleString()}
                    </div>
                )
            }),

            // Performance column
            columnHelper.accessor('performance', {
                header: 'Performance',
                cell: info => {
                    const value = info.getValue();
                    const color =
                        value >= 80
                            ? 'bg-green-500'
                            : value >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500';
                    const textColor =
                        value >= 80
                            ? 'text-green-600 bg-green-100'
                            : value >= 60
                            ? 'text-yellow-600 bg-yellow-100'
                            : 'text-red-600 bg-red-100';
                    return (
                        <div className="flex items-center space-x-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 max-w-20">
                                <div
                                    className={`h-2 rounded-full ${color}`}
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded ${textColor}`}
                            >
                                {value}%
                            </span>
                        </div>
                    );
                }
            }),

            // Created date column
            columnHelper.accessor('createdAt', {
                header: 'Joined',
                cell: info => (
                    <div className="text-sm text-gray-600">
                        {new Date(info.getValue()).toLocaleDateString()}
                    </div>
                )
            }),

            // Actions column
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                size: 120,
                cell: ({ row }) => (
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                console.log('Edit', row.original);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                        >
                            <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                try {
                                    navigator.clipboard.writeText(
                                        JSON.stringify(row.original, null, 2)
                                    );
                                    alert('Row data copied to clipboard!');
                                } catch (err) {
                                    console.log('Copy failed:', err);
                                }
                            }}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                            title="Copy"
                        >
                            <MdContentCopy className="w-4 h-4" />
                        </button>
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                if (
                                    window.confirm(
                                        'Are you sure you want to delete this item?'
                                    )
                                ) {
                                    console.log('Delete', row.original);
                                }
                            }}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                        >
                            <MdDelete className="w-4 h-4" />
                        </button>
                    </div>
                )
            })
        ];

        return enableRowSelection ? baseColumns : baseColumns.slice(1);
    }, [enableRowSelection]);

    const columns = externalColumns || defaultColumns;

    // Table instance
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: serverPagination
            ? undefined
            : getFilteredRowModel(),
        getSortedRowModel: serverPagination ? undefined : getSortedRowModel(),
        getPaginationRowModel: serverPagination
            ? undefined
            : getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection
        },
        pageCount: serverPagination
            ? Math.ceil(totalCount / pagination.pageSize)
            : undefined,
        manualPagination: serverPagination,
        manualSorting: serverPagination,
        manualFiltering: serverPagination,
        enableRowSelection: enableRowSelection
    });

    // Export functions
    const exportToCSV = () => {
        try {
            const visibleColumns = table
                .getVisibleFlatColumns()
                .filter(col => col.id !== 'select' && col.id !== 'actions');
            const headers = visibleColumns
                .map(col => col.columnDef.header)
                .join(',');
            const rows = table.getFilteredRowModel().rows.map(row =>
                visibleColumns
                    .map(col => {
                        const value = row.original[col.id];
                        return typeof value === 'string' && value.includes(',')
                            ? `"${value}"`
                            : value || '';
                    })
                    .join(',')
            );

            const csvContent = [headers, ...rows].join('\n');
            const blob = new Blob([csvContent], {
                type: 'text/csv;charset=utf-8;'
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\s+/g, '_')}_${
                new Date().toISOString().split('T')[0]
            }.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setShowExportMenu(false);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        }
    };

    const exportToJSON = () => {
        try {
            const data = table
                .getFilteredRowModel()
                .rows.map(row => row.original);
            const jsonContent = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\s+/g, '_')}_${
                new Date().toISOString().split('T')[0]
            }.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setShowExportMenu(false);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        }
    };

    const printTable = () => {
        try {
            const printWindow = window.open('', '_blank');
            const tableHTML = tableRef.current?.innerHTML || '';

            printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
              th { background-color: #f2f2f2; font-weight: bold; }
              .no-print { display: none; }
              button { display: none; }
              input[type="checkbox"] { display: none; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total records: ${totalCount}</p>
            ${tableHTML}
          </body>
        </html>
      `);

            printWindow.document.close();
            printWindow.print();
            setShowExportMenu(false);
        } catch (error) {
            console.error('Print failed:', error);
            alert('Print failed. Please try again.');
        }
    };

    // Enhanced filter dropdown
    const FilterDropdown = ({ column }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [filterValue, setFilterValue] = useState('');

        const uniqueValues = useMemo(() => {
            if (!data) return [];
            try {
                const values = data
                    .map(row => row[column.id])
                    .filter(val => val != null && val !== '');
                return [...new Set(values)].slice(0, 10);
            } catch (error) {
                console.error('Filter error:', error);
                return [];
            }
        }, [data, column.id]);

        const handleFilterApply = value => {
            try {
                column.setFilterValue(value);
                setIsOpen(false);
            } catch (error) {
                console.error('Filter apply error:', error);
            }
        };

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-1 rounded transition-colors ${
                        column.getFilterValue()
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100 text-gray-400'
                    }`}
                >
                    <MdFilterList className="w-4 h-4" />
                </button>

                {isOpen && (
                    <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-64">
                        <div className="p-3 border-b border-gray-200">
                            <input
                                type="text"
                                placeholder="Filter value..."
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterValue}
                                onChange={e => setFilterValue(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        handleFilterApply(filterValue);
                                    }
                                }}
                            />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                            {uniqueValues.map((value, index) => (
                                <button
                                    key={index}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                                    onClick={() => handleFilterApply(value)}
                                >
                                    {String(value)}
                                </button>
                            ))}
                        </div>

                        <div className="p-3 border-t border-gray-200 flex justify-between">
                            <button
                                onClick={() => {
                                    column.setFilterValue('');
                                    setFilterValue('');
                                    setIsOpen(false);
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-600 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Density classes
    const densityClasses = {
        compact: 'px-3 py-2',
        normal: 'px-6 py-4',
        comfortable: 'px-8 py-6'
    };

    // Server-side actions
    useEffect(() => {
        if (serverPagination && onServerAction) {
            try {
                onServerAction({
                    pagination,
                    sorting,
                    columnFilters,
                    globalFilter
                });
            } catch (error) {
                console.error('Server action error:', error);
            }
        }
    }, [pagination, sorting, columnFilters, globalFilter, serverPagination]);

    // Click outside handlers
    useEffect(() => {
        const handleClickOutside = event => {
            if (!event.target.closest('.export-menu')) {
                setShowExportMenu(false);
            }
            if (!event.target.closest('.column-settings')) {
                setShowColumnSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Selection helpers
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedCount = selectedRows.length;

    return (
        <div
            className={`${
                isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''
            } ${className}`}
        >
            <div
                className={`bg-white rounded-xl shadow-sm border border-gray-200 ${
                    isFullscreen ? 'h-full flex flex-col' : ''
                }`}
            >
                {/* Header Controls */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col space-y-4">
                        {/* Title Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {title}
                                </h2>
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                        {totalCount.toLocaleString()} total
                                    </span>
                                    {selectedCount > 0 && (
                                        <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
                                            {selectedCount} selected
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {/* Density Control */}
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    {['compact', 'normal', 'comfortable'].map(
                                        d => (
                                            <button
                                                key={d}
                                                onClick={() => setDensity(d)}
                                                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                                                    density === d
                                                        ? 'bg-white text-gray-900 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            >
                                                {d}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Fullscreen Toggle */}
                                <button
                                    onClick={() =>
                                        setIsFullscreen(!isFullscreen)
                                    }
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    title={
                                        isFullscreen
                                            ? 'Exit fullscreen'
                                            : 'Enter fullscreen'
                                    }
                                >
                                    {isFullscreen ? (
                                        <MdFullscreenExit className="w-4 h-4" />
                                    ) : (
                                        <MdFullscreen className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Controls Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Search */}
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search across all columns..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                                    value={globalFilter ?? ''}
                                    onChange={e =>
                                        setGlobalFilter(e.target.value)
                                    }
                                />
                                {globalFilter && (
                                    <button
                                        onClick={() => setGlobalFilter('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <MdClose className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                                {/* Add Button */}
                                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <MdAdd className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Add New
                                    </span>
                                </button>

                                {/* Column Settings */}
                                <div className="relative column-settings">
                                    <button
                                        onClick={() =>
                                            setShowColumnSettings(
                                                !showColumnSettings
                                            )
                                        }
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        title="Column settings"
                                    >
                                        <MdViewColumn className="w-4 h-4 text-gray-600" />
                                    </button>

                                    {showColumnSettings && (
                                        <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-64">
                                            <div className="p-4 border-b border-gray-200">
                                                <h3 className="font-medium text-gray-900">
                                                    Column Visibility
                                                </h3>
                                            </div>
                                            <div className="p-2 max-h-64 overflow-y-auto">
                                                {table.getAllColumns().map(
                                                    column =>
                                                        column.id !==
                                                            'select' &&
                                                        column.id !==
                                                            'actions' && (
                                                            <label
                                                                key={column.id}
                                                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={column.getIsVisible()}
                                                                    onChange={column.getToggleVisibilityHandler()}
                                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <span className="text-sm text-gray-700">
                                                                    {
                                                                        column
                                                                            .columnDef
                                                                            .header
                                                                    }
                                                                </span>
                                                            </label>
                                                        )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Export Menu */}
                                {enableExport && (
                                    <div className="relative export-menu">
                                        <button
                                            onClick={() =>
                                                setShowExportMenu(
                                                    !showExportMenu
                                                )
                                            }
                                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <MdDownload className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                Export
                                            </span>
                                            <MdExpandMore className="w-4 h-4" />
                                        </button>

                                        {showExportMenu && (
                                            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
                                                <div className="p-2">
                                                    <button
                                                        onClick={exportToCSV}
                                                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
                                                    >
                                                        <MdTableChart className="w-4 h-4 text-green-600" />
                                                        <span>
                                                            Export as CSV
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={exportToJSON}
                                                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
                                                    >
                                                        <MdFileDownload className="w-4 h-4 text-blue-600" />
                                                        <span>
                                                            Export as JSON
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={printTable}
                                                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
                                                    >
                                                        <MdPrint className="w-4 h-4 text-purple-600" />
                                                        <span>Print Table</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Refresh Button */}
                                <button
                                    onClick={() => window.location.reload()}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={loading}
                                    title="Refresh data"
                                >
                                    <MdRefresh
                                        className={`w-4 h-4 text-gray-600 ${
                                            loading ? 'animate-spin' : ''
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        {selectedCount > 0 && (
                            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-blue-900">
                                        {selectedCount} item
                                        {selectedCount > 1 ? 's' : ''} selected
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => {
                                                try {
                                                    const selectedData =
                                                        selectedRows.map(
                                                            row => row.original
                                                        );
                                                    const jsonContent =
                                                        JSON.stringify(
                                                            selectedData,
                                                            null,
                                                            2
                                                        );
                                                    const blob = new Blob(
                                                        [jsonContent],
                                                        {
                                                            type: 'application/json'
                                                        }
                                                    );
                                                    const url =
                                                        window.URL.createObjectURL(
                                                            blob
                                                        );
                                                    const a =
                                                        document.createElement(
                                                            'a'
                                                        );
                                                    a.href = url;
                                                    a.download = `selected_items_${
                                                        new Date()
                                                            .toISOString()
                                                            .split('T')[0]
                                                    }.json`;
                                                    document.body.appendChild(
                                                        a
                                                    );
                                                    a.click();
                                                    document.body.removeChild(
                                                        a
                                                    );
                                                    window.URL.revokeObjectURL(
                                                        url
                                                    );
                                                } catch (error) {
                                                    console.error(
                                                        'Export failed:',
                                                        error
                                                    );
                                                }
                                            }}
                                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                        >
                                            <MdDownload className="w-4 h-4" />
                                            <span>Export Selected</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        `Are you sure you want to delete ${selectedCount} selected items?`
                                                    )
                                                ) {
                                                    console.log(
                                                        'Bulk delete:',
                                                        selectedRows.map(
                                                            row => row.original
                                                        )
                                                    );
                                                    setRowSelection({});
                                                }
                                            }}
                                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                                        >
                                            <MdDelete className="w-4 h-4" />
                                            <span>Delete Selected</span>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setRowSelection({})}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        )}

                        {/* Active Filters */}
                        {(columnFilters.length > 0 || globalFilter) && (
                            <div className="flex items-center space-x-2 flex-wrap">
                                <span className="text-sm text-gray-500 flex items-center space-x-1">
                                    <MdInfo className="w-4 h-4" />
                                    <span>Active filters:</span>
                                </span>
                                {globalFilter && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                        <span>Search: "{globalFilter}"</span>
                                        <button
                                            onClick={() => setGlobalFilter('')}
                                        >
                                            <MdClose className="w-3 h-3 hover:text-blue-900" />
                                        </button>
                                    </span>
                                )}
                                {columnFilters.map(filter => (
                                    <span
                                        key={filter.id}
                                        className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                                    >
                                        <span>
                                            {filter.id}: {filter.value}
                                        </span>
                                        <button
                                            onClick={() =>
                                                table
                                                    .getColumn(filter.id)
                                                    ?.setFilterValue('')
                                            }
                                        >
                                            <MdClose className="w-3 h-3 hover:text-purple-900" />
                                        </button>
                                    </span>
                                ))}
                                <button
                                    onClick={() => {
                                        setColumnFilters([]);
                                        setGlobalFilter('');
                                    }}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium ml-2"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div
                    className={`overflow-auto  ${isFullscreen ? 'flex-1' : ''}`}
                    ref={tableRef}
                >
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, idx) => (
                                        <th
                                            key={header.id}
                                            className={`${densityClasses[density]} text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200`}
                                            style={{ width: header.getSize() }}
                                        >
                                            <div
                                                className={`flex items-center ${
                                                    idx === 0
                                                        ? 'justify-center'
                                                        : 'justify-between'
                                                } `}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    {header.isPlaceholder ? null : (
                                                        <button
                                                            className={`flex items-center space-x-1 hover:text-gray-700 transition-colors ${
                                                                header.column.getCanSort()
                                                                    ? 'cursor-pointer select-none'
                                                                    : ''
                                                            }`}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            <span>
                                                                {flexRender(
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext()
                                                                )}
                                                            </span>
                                                            {header.column.getCanSort() && (
                                                                <div className="flex flex-col">
                                                                    {header.column.getIsSorted() ===
                                                                    'asc' ? (
                                                                        <MdExpandLess className="w-4 h-4 text-blue-600" />
                                                                    ) : header.column.getIsSorted() ===
                                                                      'desc' ? (
                                                                        <MdExpandMore className="w-4 h-4 text-blue-600" />
                                                                    ) : (
                                                                        <MdSwapVert className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                                {header.column.getCanFilter() && (
                                                    <FilterDropdown
                                                        column={header.column}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="flex space-x-1">
                                                <div
                                                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: '0ms'
                                                    }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: '150ms'
                                                    }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: '300ms'
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-500 text-lg font-medium">
                                                Loading data...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <MdSearch className="w-12 h-12 text-gray-300" />
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    No data found
                                                </h3>
                                                <p className="text-gray-500">
                                                    Try adjusting your search or
                                                    filter criteria
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setColumnFilters([]);
                                                    setGlobalFilter('');
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className={`
                      hover:bg-blue-50 transition-all duration-200 cursor-pointer group
                      ${
                          row.getIsSelected()
                              ? 'bg-blue-100 border-l-4 border-blue-500'
                              : ''
                      }
                      ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}
                    `}
                                        onClick={() =>
                                            onRowClick?.(row.original)
                                        }
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={`${densityClasses[density]} whitespace-nowrap text-sm border-b border-gray-100 group-hover:border-blue-200 transition-colors`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700 font-medium">
                                    Rows per page:
                                </span>
                                <select
                                    value={table.getState().pagination.pageSize}
                                    onChange={e =>
                                        table.setPageSize(
                                            Number(e.target.value)
                                        )
                                    }
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {[10, 20, 30, 50, 100].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-sm text-gray-700">
                                <span className="font-medium">
                                    {table.getState().pagination.pageIndex *
                                        table.getState().pagination.pageSize +
                                        1}
                                </span>{' '}
                                -{' '}
                                <span className="font-medium">
                                    {Math.min(
                                        (table.getState().pagination.pageIndex +
                                            1) *
                                            table.getState().pagination
                                                .pageSize,
                                        totalCount
                                    )}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {totalCount.toLocaleString()}
                                </span>{' '}
                                entries
                            </div>

                            {selectedCount > 0 && (
                                <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
                                    {selectedCount} selected
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                title="First page"
                            >
                                <MdFirstPage className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                title="Previous page"
                            >
                                <MdChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center space-x-1">
                                {Array.from(
                                    {
                                        length: Math.min(
                                            5,
                                            table.getPageCount()
                                        )
                                    },
                                    (_, i) => {
                                        const pageIndex =
                                            table.getState().pagination
                                                .pageIndex;
                                        const pageCount = table.getPageCount();
                                        let displayPage;

                                        if (pageCount <= 5) {
                                            displayPage = i;
                                        } else if (pageIndex < 3) {
                                            displayPage = i;
                                        } else if (pageIndex > pageCount - 3) {
                                            displayPage = pageCount - 5 + i;
                                        } else {
                                            displayPage = pageIndex - 2 + i;
                                        }

                                        if (
                                            displayPage < 0 ||
                                            displayPage >= pageCount
                                        )
                                            return null;

                                        return (
                                            <button
                                                key={displayPage}
                                                onClick={() =>
                                                    table.setPageIndex(
                                                        displayPage
                                                    )
                                                }
                                                className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                                                    displayPage === pageIndex
                                                        ? 'bg-blue-600 text-white shadow-lg'
                                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {displayPage + 1}
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                title="Next page"
                            >
                                <MdChevronRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                title="Last page"
                            >
                                <MdLastPage className="w-5 h-5" />
                            </button>

                            <div className="ml-4 text-sm text-gray-500">
                                Page{' '}
                                <span className="font-medium">
                                    {table.getState().pagination.pageIndex + 1}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {table.getPageCount()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UltimateDataTable;
