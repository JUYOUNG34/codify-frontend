import React from 'react';

const CTASection = () => (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <div className="absolute inset-0 bg-white/30"></div>



        <div className="relative max-w-4xl mx-auto text-center px-6">
            <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-12 border border-white/50 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        지금 바로 시작하세요!
                    </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    수천명의 개발자들이 이미 Codify에서 소통하고 성장하고 있습니다
                </p>
                <div className="flex justify-center mb-8">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                        무료로 가입하기 🎉
                    </button>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-blue-600 font-semibold">✓</span>
                        <span>다양한 취업 정보 </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-indigo-600 font-semibold">✓</span>
                        <span>현직자들과의 맨토링</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-purple-600 font-semibold">✓</span>
                        <span>활발한 커뮤니티</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-blue-600 font-semibold">✓</span>
                        <span>AI 상담센터</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default CTASection;