import React from 'react';

export default function Btn({
    onClick,
    loading,
    hidden,
    disabled,
    label,
    className = '',
    defaultState = true,
    loaderSize = 'size-7',
    type
}) {
    if (defaultState) className += ' bg-blue-600 w-full rounded-lg text-white';
    if (hidden) return null;
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} flex items-center py-2 justify-center `}
            disabled={disabled}
        >
            {loading && (
                <span
                    className={`${loaderSize} animate-spin shrink-0 rounded-full border-4 border-white border-t-transparent`}
                ></span>
            )}
            {!loading && <span className="text-lg font-medium">{label}</span>}
        </button>
    );
}
