import React from 'react';
import StatsCard from './StatsCard';
import ChatRoomCard from './ChatRoomCard';

const CommunitySection = () => {
    const stats = [
        { number: "1,234", label: "활성 사용자", color: "text-blue-600" },
        { number: "56", label: "채팅방", color: "text-purple-600" },
        { number: "12,345", label: "메시지", color: "text-green-600" },
        { number: "89", label: "팀빌딩 성공", color: "text-red-600" }
    ];

    const chatRooms = [
        {
            initial: "J",
            name: "Java 개발자 모임",
            members: "1,234명 참여",
            description: "Spring Boot, JPA, 최신 Java 트렌드 논의",
            bgColor: "bg-orange-500",
            tags: [
                { text: "Java", color: "bg-orange-100 text-orange-800" },
                { text: "Spring", color: "bg-green-100 text-green-800" }
            ]
        },
        {
            initial: "R",
            name: "React 프론트엔드",
            members: "987명 참여",
            description: "React, Next.js, TypeScript 고민 해결",
            bgColor: "bg-blue-500",
            tags: [
                { text: "React", color: "bg-blue-100 text-blue-800" },
                { text: "Next.js", color: "bg-purple-100 text-purple-800" }
            ]
        },
        {
            initial: "T",
            name: "팀빌딩 & 프로젝트",
            members: "567명 참여",
            description: "사이드 프로젝트 팀원 모집",
            bgColor: "bg-green-500",
            tags: [
                { text: "팀빌딩", color: "bg-green-100 text-green-800" },
                { text: "프로젝트", color: "bg-yellow-100 text-yellow-800" }
            ]
        }
    ];

    return (
        <section id="community" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        활발한 개발자 커뮤니티
                    </h2>
                    <p className="text-xl text-gray-600">
                        이미 많은 개발자들이 Codify에서 소통하고 있어요
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="bg-gray-50 rounded-3xl p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">인기 채팅방</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chatRooms.map((room, index) => (
                            <ChatRoomCard key={index} {...room} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;