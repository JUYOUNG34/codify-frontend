import React from 'react';
import { clsx } from 'clsx';

export const InlineSpinner = ({ size = 'sm', color = 'primary' }) => {
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5'
    };

    const colorClasses = {
        primary: 'text-primary-500',
        white: 'text-white',
        gray: 'text-gray-400'
    };

    return (
        <svg
            className={clsx(
                'animate-spin inline',
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
    );
};

export const PageLoader = ({ text = '로딩 중...' }) => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin w-12 h-12 text-primary-500"
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
                <p className="mt-4 text-lg text-gray-600 font-medium">{text}</p>
            </div>
        </div>
    );
};

export const ButtonSpinner = ({ size = 'sm' }) => {
    return <InlineSpinner size={size} color="white" />;
};

export const SectionLoader = ({ height = '200px', text = null }) => {
    return (
        <div
            className="flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
            style={{ height }}
        >
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin w-8 h-8 text-primary-500"
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
                    <p className="mt-2 text-sm text-gray-600">{text}</p>
                )}
            </div>
        </div>
    );
};

export const MessageSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex space-x-3 p-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export const RoomListSkeleton = () => {
    return (
        <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    );
};