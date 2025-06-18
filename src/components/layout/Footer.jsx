import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">🚀</span>
                        </div>
                        <span className="text-2xl font-bold">Codify</span>
                    </div>
                    <p className="text-gray-400">개발자들의 새로운 소통 공간</p>
                </div>

                {[
                    {
                        title: "서비스",
                        links: ["채팅", "팀빌딩", "취업정보", "AI 어시스턴트"]
                    },
                    {
                        title: "회사",
                        links: ["소개", "블로그", "채용", "문의"]
                    },
                    {
                        title: "지원",
                        links: ["도움말", "API 문서", "개발자 가이드", "상태"]
                    }
                ].map((section, index) => (
                    <div key={index}>
                        <h3 className="font-semibold mb-4">{section.title}</h3>
                        <ul className="space-y-2 text-gray-400">
                            {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </footer>
);

export default Footer;