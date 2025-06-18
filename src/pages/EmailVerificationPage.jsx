import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';

const EmailVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setError('유효하지 않은 인증 링크입니다.');
            setLoading(false);
            return;
        }

        verifyEmail(token);
    }, [searchParams]);

    const verifyEmail = async (token) => {
        try {
            const response = await fetch(`http://localhost:8080/api/email/verify?token=${token}`);
            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.error || '인증에 실패했습니다.');
            }
        } catch (err) {
            setError('서버 연결에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                    <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">이메일 인증 중...</h2>
                    <p className="text-gray-600">잠시만 기다려주세요.</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">인증 완료!</h2>
                    <p className="text-gray-600 mb-6">
                        이메일 인증이 성공적으로 완료되었습니다.<br />
                        이제 모든 기능을 사용할 수 있습니다.
                    </p>
                    <div className="flex items-center justify-center text-green-600">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        <span>로그인 페이지로 이동 중...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">인증 실패</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        로그인 페이지로 이동
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        다시 회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;