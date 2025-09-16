import React from 'react';

export default function NameEmailCell({ info }) {
    const row = info.row.original;
    return (
        <div className="flex items-center space-x-3">
            <img
                src={row.avatar}
                alt={info.getValue()}
                className="w-8 h-8 rounded-full ring-2 ring-blue-100"
            />
            <div>
                <div className="font-medium text-gray-900">
                    {info.getValue()}
                </div>
                <div className="text-sm text-gray-500">{row.email}</div>
            </div>
        </div>
    );
}
