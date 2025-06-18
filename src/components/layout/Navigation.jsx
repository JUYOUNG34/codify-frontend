import React from 'react';

const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">🚀</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Codify
          </span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">기능</a>
                    <a href="#community" className="text-gray-700 hover:text-blue-600 transition-colors">커뮤니티</a>
                    <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">소개</a>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105">
                        시작하기
                    </button>
                </div>
            </div>
        </div>
    </nav>
);

export default Navigation;