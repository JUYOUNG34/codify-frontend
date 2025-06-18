import React from 'react';
import { Loader2 } from 'lucide-react';

const SuccessScreen = ({ emailSent = false }) => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">가입 완료!</h2>
                <p className="text-gray-600 mb-4">Codify 커뮤니티에 오신 것을 환영합니다!</p>

                {emailSent ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-blue-800 text-sm">
                            📧 이메일 인증 링크를 발송했습니다.<br />
                            이메일을 확인하여 인증을 완료해주세요.
                        </p>
                    </div>
                ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                        <p className="text-orange-800 text-sm">
                            ⚠️ 이메일 발송에 실패했습니다.<br />
                            로그인 후 인증 이메일을 재발송할 수 있습니다.
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                    <span className="ml-2 text-green-600">로그인 페이지로 이동 중...</span>
                </div>
            </div>
        </div>
    </div>
);

export default SuccessScreen;