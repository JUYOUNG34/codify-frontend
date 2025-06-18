import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Loader2, User, Lock } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email) {
            setError('이메일을 입력해주세요.');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('올바른 이메일 형식을 입력해주세요.');
            return false;
        }
        if (!formData.password) {
            setError('비밀번호를 입력해주세요.');
            return false;
        }
        if (formData.password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);

                console.log('로그인 성공:', data);
                console.log('JWT 토큰:', data.data?.token);


                setTimeout(() => {
                    alert('로그인 성공! 대시보드로 이동합니다.');
                }, 1000);
            } else {
                // 로그인 실패
                setError(data.error || '로그인에 실패했습니다.');
            }
        } catch (err) {
            console.error('로그인 요청 실패:', err);
            setError('서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleKakaoLogin = () => {
        console.log('카카오 로그인 시도');
        alert('카카오 로그인 기능을 준비 중입니다!\n곧 카카오 JavaScript SDK와 연동될 예정입니다.');
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인 성공!</h2>
                        <p className="text-gray-600 mb-6">환영합니다. 잠시 후 대시보드로 이동합니다.</p>
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="ml-2 text-blue-600">로딩 중...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Codify에 로그인</h1>
                    <p className="text-gray-600">개발자 커뮤니티에 참여하세요</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                이메일 주소
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                비밀번호
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="비밀번호를 입력하세요"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                <p className="text-red-600 text-sm flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    로그인 중...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <LogIn className="w-5 h-5 mr-2" />
                                    로그인
                                </div>
                            )}
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-center text-sm font-medium text-gray-700 mb-4">
                            또는 간편하게 로그인
                        </p>
                        <button
                            type="button"
                            onClick={handleKakaoLogin}
                            className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.44 5.36 3.65 7.06L4.5 21l3.44-1.15C9.1 20.6 10.53 21 12 21c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                            </svg>
                            카카오로 시작하기
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            계정이 없으신가요?{' '}
                            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                회원가입
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">🔗 백엔드 연동 정보</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>API 엔드포인트:</strong> POST /api/auth/login</p>
                        <p><strong>서버 주소:</strong> http://localhost:8080</p>
                        <p><strong>상태:</strong> <span className="text-green-600">연동 준비 완료</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;