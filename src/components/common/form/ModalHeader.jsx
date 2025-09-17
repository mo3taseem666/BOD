import React from 'react';

export default function FormHeader({ setIsModalOpen, header }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-800"
            >
                {header}
            </h2>
            <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
                ×
            </button>
        </div>
    );
}
