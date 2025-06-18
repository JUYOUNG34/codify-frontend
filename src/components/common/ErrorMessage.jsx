import React from 'react';

const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
        <p className="text-red-600 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {message}
        </p>
    </div>
);

export default ErrorMessage;