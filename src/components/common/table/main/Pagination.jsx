import React from 'react';
import {
    MdChevronLeft,
    MdChevronRight,
    MdFirstPage,
    MdLastPage
} from 'react-icons/md';

export default function Pagination({ table, totalCount, selectedCount }) {
    return (
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
                                table.setPageSize(Number(e.target.value))
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
                                (table.getState().pagination.pageIndex + 1) *
                                    table.getState().pagination.pageSize,
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
                            { length: Math.min(5, table.getPageCount()) },
                            (_, i) => {
                                const pageIndex =
                                    table.getState().pagination.pageIndex;
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

                                if (displayPage < 0 || displayPage >= pageCount)
                                    return null;

                                return (
                                    <button
                                        key={displayPage}
                                        onClick={() =>
                                            table.setPageIndex(displayPage)
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
    );
}
