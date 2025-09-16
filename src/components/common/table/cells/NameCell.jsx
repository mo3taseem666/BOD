import React from 'react';

export default function NameCell({ info }) {
    
    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                    {info.getValue().charAt(0)}
                </span>
            </div>
            <div>
                <div className="font-semibold text-gray-900">
                    {info.getValue()}
                </div>
                <div className="text-xs text-gray-500">Product</div>
            </div>
        </div>
    );
}
