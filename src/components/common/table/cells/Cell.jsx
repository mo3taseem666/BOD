import React from 'react';

export default function Cell({ info }) {
    return (
        <div className="text-sm text-gray-700 font-medium">
            {info.getValue()}
        </div>
    );
}
