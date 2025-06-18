import React from 'react';
import ChatPreview from './ChatPreview';

const AboutSection = () => (
    <section id="about" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        개발자를 위한,<br />
                        개발자에 의한 플랫폼
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        현직 개발자들이 만든 Codify는 실제 개발자들이 필요로 하는 기능들로 구성되어 있습니다.
                    </p>
                    <div className="space-y-4">
                        {[
                            "기술별 전문 채팅방으로 깊이 있는 논의",
                            "AI 기반 기술 질문 답변 시스템",
                            "실시간 팀빌딩과 프로젝트 매칭",
                            "취업 정보와 면접 후기 공유"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <ChatPreview />
            </div>
        </div>
    </section>
);

export default AboutSection;