import React from 'react';
import { clsx } from 'clsx';

const LoadingSpinner = ({
                            size = 'md',
                            color = 'primary',
                            className = '',
                            text = null
                        }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };

    const colorClasses = {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        gray: 'text-gray-400',
        white: 'text-white'
    };

    return (
        <div className={clsx('flex flex-col items-center justify-center', className)}>
            <svg
                className={clsx(
                    'animate-spin',
                    sizeClasses[size],
                    colorClasses[color]
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            {text && (
                <p className="mt-2 text-sm text-gray-600 font-medium">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;