import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">🚀 Codify 프론트엔드</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">프로젝트 현황</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">✅ 완성된 부분</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• React 18 + Vite 설정</li>
                            <li>• Tailwind CSS 디자인 시스템</li>
                            <li>• React Router 라우팅</li>
                            <li>• 홈페이지 완성</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">🔨 다음 할 일</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Redux Store 설정</li>
                            <li>• API 서비스 레이어</li>
                            <li>• 인증 시스템</li>
                            <li>• 채팅 기능 구현</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">📋 기능 링크</h3>
                    <div className="flex space-x-4">
                        <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">홈페이지</a>
                        <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">로그인</a>
                        <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">회원가입</a>
                        <a href="/chat" className="text-blue-600 hover:text-blue-700 font-medium">채팅</a>
                        <a href="/profile" className="text-blue-600 hover:text-blue-700 font-medium">프로필</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Chat = () => (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">💬 채팅</h1>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex h-96">
                    <div className="w-1/3 border-r border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-800 mb-4">채팅방 목록</h3>
                        <div className="space-y-2">
                            {['Java 개발자 모임', 'React 스터디', '취업 정보 공유', '프로젝트 팀빌딩'].map((room, i) => (
                                <div key={i} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <div className="font-medium text-gray-900">{room}</div>
                                    <div className="text-sm text-gray-500">마지막 메시지...</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">Java 개발자 모임</h3>
                            <p className="text-sm text-gray-500">12명 온라인</p>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {[
                                    { user: '개발자A', message: '안녕하세요! 자바 스프링 부트 질문이 있습니다.', time: '14:32' },
                                    { user: '개발자B', message: '네, 말씀해보세요!', time: '14:33' },
                                    { user: '개발자C', message: 'JPA에서 N+1 문제 해결 방법이 궁금해요.', time: '14:35' },
                                ].map((msg, i) => (
                                    <div key={i} className="flex space-x-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                            {msg.user[2]}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">{msg.user}</span>
                                                <span className="text-xs text-gray-500">{msg.time}</span>
                                            </div>
                                            <div className="text-gray-700">{msg.message}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="메시지를 입력하세요..."
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    전송
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Profile = () => (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">👤 프로필</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        개
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">개발자</h2>
                        <p className="text-gray-600">developer@codify.com</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">Java</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Spring Boot</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">React</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">기본 정보</h3>
                        <div className="space-y-2 text-sm">
                            <div><span className="text-gray-600">경력:</span> 미들 (3-5년)</div>
                            <div><span className="text-gray-600">GitHub:</span> <a href="#" className="text-blue-600">@developer</a></div>
                            <div><span className="text-gray-600">포트폴리오:</span> <a href="#" className="text-blue-600">portfolio.dev</a></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">활동 통계</h3>
                        <div className="space-y-2 text-sm">
                            <div><span className="text-gray-600">참여한 채팅방:</span> 8개</div>
                            <div><span className="text-gray-600">보낸 메시지:</span> 1,234개</div>
                            <div><span className="text-gray-600">가입일:</span> 2025년 1월</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const NotFound = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
            <a
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                홈으로 돌아가기
            </a>
        </div>
    </div>
);

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/verify-email" element={<EmailVerificationPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;