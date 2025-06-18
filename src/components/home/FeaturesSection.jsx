import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
    const features = [
        {
            icon: "💬",
            title: "실시간 채팅",
            description: "Java, React, Spring Boot 등 기술별 채팅방에서 실시간으로 소통하세요",
            bgColor: "bg-blue-100",
            tags: [
                { text: "WebSocket", color: "bg-blue-100 text-blue-800" },
                { text: "실시간", color: "bg-green-100 text-green-800" }
            ]
        },
        {
            icon: "🤝",
            title: "팀빌딩",
            description: "프로젝트 팀원을 구하거나 스터디 그룹을 만들어보세요",
            bgColor: "bg-purple-100",
            tags: [
                { text: "협업", color: "bg-purple-100 text-purple-800" },
                { text: "스터디", color: "bg-pink-100 text-pink-800" }
            ]
        },
        {
            icon: "💼",
            title: "취업 정보",
            description: "최신 채용 정보와 면접 후기를 실시간으로 공유하세요",
            bgColor: "bg-green-100",
            tags: [
                { text: "채용", color: "bg-green-100 text-green-800" },
                { text: "면접", color: "bg-yellow-100 text-yellow-800" }
            ]
        },
        {
            icon: "🤖",
            title: "AI 어시스턴트",
            description: "기술 질문이나 면접 준비를 AI가 도와드려요",
            bgColor: "bg-red-100",
            tags: [
                { text: "OpenAI", color: "bg-red-100 text-red-800" },
                { text: "스마트", color: "bg-orange-100 text-orange-800" }
            ]
        },
        {
            icon: "📋",
            title: "정보 게시판",
            description: "기술 트렌드, 개발 팁, 유용한 정보들을 공유하고 토론하세요",
            bgColor: "bg-indigo-100",
            tags: [
                { text: "정보공유", color: "bg-indigo-100 text-indigo-800" },
                { text: "토론", color: "bg-cyan-100 text-cyan-800" }
            ]
        },
        {
            icon: "💭",
            title: "자유 게시판",
            description: "개발 고민, 일상 이야기, 자유로운 주제로 소통해보세요",
            bgColor: "bg-yellow-100",
            tags: [
                { text: "자유토론", color: "bg-yellow-100 text-yellow-800" },
                { text: "소통", color: "bg-rose-100 text-rose-800" }
            ]
        }
    ];

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-xl"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                            ✨ 핵심 기능들
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        왜 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Codify</span>인가요?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        개발자들이 진짜 필요로 하는 기능들을 모두 담았습니다
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;