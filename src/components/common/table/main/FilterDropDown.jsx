import { useMemo, useState } from 'react';
import { MdFilterList } from 'react-icons/md';

const FilterDropdown = ({ column, data }) => {
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

export default FilterDropdown;
