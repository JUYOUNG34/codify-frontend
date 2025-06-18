import React, { useState } from 'react';

const ChatPreview = () => (
    <div className="relative">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        개
                    </div>
                    <div>
                        <div className="font-semibold">개발자A</div>
                        <div className="text-sm text-gray-500">Java 백엔드 개발자</div>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-gray-700">Spring Boot에서 JPA N+1 문제 해결 방법 아시는 분 계신가요?</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        시
                    </div>
                    <div>
                        <div className="font-semibold">시니어개발자</div>
                        <div className="text-sm text-gray-500">10년차 백엔드</div>
                    </div>
                </div>
                <div className="bg-blue-100 rounded-2xl p-4">
                    <p className="text-gray-700">@EntityGraph나 fetch join을 사용해보세요!</p>
                </div>
                <div className="flex space-x-2">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">❤️ 5</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">👍 12</span>
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">🚀 3</span>
                </div>
            </div>
        </div>
    </div>
);

export default ChatPreview;