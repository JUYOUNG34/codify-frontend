import React from 'react';

const HeroSection = () => (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <div className="absolute inset-0 bg-white/30"></div>

        <div className="absolute top-16 left-8 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                ⚡
            </div>
        </div>
        <div className="absolute top-24 right-16 animate-pulse">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center text-lg shadow-lg">
                💻
            </div>
        </div>
        <div className="absolute bottom-20 left-16 animate-spin" style={{animationDuration: '4s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center text-lg shadow-lg">
                🎯
            </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block text-gray-800">개발자들의</span>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    새로운 소통 공간
                </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                기술별 채팅방에서 실시간으로 소통하고, 팀빌딩하고, 정보를 공유하세요
            </p>
            <div className="flex justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    지금 시작하기 🚀
                </button>
            </div>
        </div>
    </section>
);

export default HeroSection;