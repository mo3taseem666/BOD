import { flexRender } from '@tanstack/react-table';
import React from 'react';
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
import FilterDropDown from './FilterDropDown';

const densityClasses = {
    compact: 'px-3 py-2',
    normal: 'px-6 py-4',
    comfortable: 'px-8 py-6'
};

export default function MainTable({
    table,
    data,
    density,
    loading,
    columns,
    setGlobalFilter,
    setColumnFilters,
    onRowClick
}) {
    return (
        <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className={`${densityClasses[density]} text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200`}
                                style={{ width: header.getSize() }}
                            >
                                <div className="flex items-center justify-between">
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
                                                        header.column.columnDef
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
                                        <FilterDropDown
                                            column={header.column}
                                            data={data}
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
                                        style={{ animationDelay: '0ms' }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                        style={{ animationDelay: '150ms' }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                        style={{ animationDelay: '300ms' }}
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
                                        Try adjusting your search or filter
                                        criteria
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
                            onClick={() => onRowClick?.(row.original)}
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
    );
}
