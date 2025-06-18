import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, User, Lock, Check, X, Loader2 } from 'lucide-react';
import ErrorMessage from '../common/ErrorMessage';

const Step1BasicInfo = ({ formData, setFormData, error, onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailValidation, setEmailValidation] = useState({ checking: false, available: null, verified: false });
    const [nicknameValidation, setNicknameValidation] = useState({ checking: false, available: null });
    const [verificationCode, setVerificationCode] = useState('');
    const [codeSending, setCodeSending] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            setEmailValidation({ checking: false, available: null, verified: false });
            setTimer(0); // 이메일 변경 시 타이머 초기화
        }
        if (name === 'nickname') {
            setNicknameValidation({ checking: false, available: null });
        }
    };

    const checkEmailExists = async (email) => {
        if (!email || !email.includes('@')) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        setEmailValidation({ checking: true, available: null, verified: false });

        try {
            const response = await fetch(`http://localhost:8080/api/users/check-email/${email}`);
            const exists = await response.json();

            setEmailValidation({
                checking: false,
                available: !exists,
                verified: false
            });

            if (exists) {
                alert('이미 사용 중인 이메일입니다.');
            } else {
                alert('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            console.error('이메일 중복 확인 실패:', error);
            setEmailValidation({ checking: false, available: null, verified: false });
            alert('서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        }
    };

    const checkNicknameExists = async (nickname) => {
        if (!nickname || nickname.length < 2) {
            alert('닉네임은 2자 이상이어야 합니다.');
            return;
        }

        setNicknameValidation({ checking: true, available: null });

        try {
            const response = await fetch(`http://localhost:8080/api/users/check-nickname/${nickname}`);
            const exists = await response.json();

            setNicknameValidation({
                checking: false,
                available: !exists
            });

            if (exists) {
                alert('이미 사용 중인 닉네임입니다.');
            } else {
                alert('사용 가능한 닉네임입니다.');
            }
        } catch (error) {
            console.error('닉네임 중복 확인 실패:', error);
            setNicknameValidation({ checking: false, available: null });
            alert('서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        }
    };

    const sendVerificationCode = async () => {
        if (!emailValidation.available) {
            alert('먼저 이메일 중복 확인을 해주세요.');
            return;
        }

        setCodeSending(true);

        try {
            const response = await fetch('http://localhost:8080/api/email/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('인증번호가 이메일로 발송되었습니다. (5분간 유효)');
                setTimer(300); // 5분 타이머 시작
            } else {
                alert(data.error || '인증번호 발송에 실패했습니다.');
            }
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
            alert('서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        } finally {
            setCodeSending(false);
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            alert('인증번호를 입력해주세요.');
            return;
        }

        if (verificationCode.length !== 6) {
            alert('인증번호는 6자리 숫자입니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/email/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    code: verificationCode
                })
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                setEmailValidation(prev => ({ ...prev, verified: true }));
                alert('이메일 인증이 완료되었습니다!');
                setTimer(0); // 타이머 종료
            } else {
                alert(data.message || '인증번호가 일치하지 않거나 만료되었습니다.');
            }
        } catch (error) {
            console.error('인증 확인 실패:', error);
            alert('서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        }
    };

    const validateAndNext = () => {
        if (!formData.email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!emailValidation.available) {
            alert('이메일 중복 확인을 해주세요.');
            return;
        }
        if (!emailValidation.verified) {
            alert('이메일 인증을 완료해주세요.');
            return;
        }
        if (!formData.nickname) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        if (!nicknameValidation.available) {
            alert('닉네임 중복 확인을 해주세요.');
            return;
        }
        if (!formData.password || formData.password.length < 6) {
            alert('비밀번호는 6자 이상이어야 합니다.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        onNext();
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">기본 정보 입력</h3>
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        이메일 주소 *
                    </label>
                    <div className="flex space-x-2">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="your@email.com"
                            />
                            {emailValidation.checking && (
                                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
                            )}
                            {emailValidation.available === true && !emailValidation.verified && (
                                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                            )}
                            {emailValidation.verified && (
                                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                            {emailValidation.available === false && (
                                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => checkEmailExists(formData.email)}
                            disabled={!formData.email || emailValidation.checking}
                            className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {emailValidation.checking ? '확인중...' : '중복확인'}
                        </button>
                    </div>
                    {emailValidation.available === false && (
                        <p className="text-red-600 text-sm mt-1">이미 사용 중인 이메일입니다.</p>
                    )}
                    {emailValidation.available === true && !emailValidation.verified && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                            <div className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="인증번호 6자리"
                                    maxLength={6}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={sendVerificationCode}
                                    disabled={codeSending || timer > 0}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {codeSending ? '발송중...' : timer > 0 ? '재발송 대기' : '인증번호 발송'}
                                </button>
                                <button
                                    type="button"
                                    onClick={verifyCode}
                                    disabled={!verificationCode || verificationCode.length !== 6}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                                >
                                    확인
                                </button>
                            </div>
                            {timer > 0 && (
                                <p className="text-orange-600 text-sm">
                                    ⏰ 남은 시간: {formatTime(timer)}
                                </p>
                            )}
                            {emailValidation.verified && (
                                <p className="text-green-600 text-sm">✅ 이메일 인증이 완료되었습니다.</p>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        닉네임 *
                    </label>
                    <div className="flex space-x-2">
                        <div className="relative flex-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="채팅에서 사용할 닉네임"
                            />
                            {nicknameValidation.checking && (
                                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
                            )}
                            {nicknameValidation.available === true && (
                                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                            {nicknameValidation.available === false && (
                                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => checkNicknameExists(formData.nickname)}
                            disabled={!formData.nickname || nicknameValidation.checking}
                            className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {nicknameValidation.checking ? '확인중...' : '중복확인'}
                        </button>
                    </div>
                    {nicknameValidation.available === false && (
                        <p className="text-red-600 text-sm mt-1">이미 사용 중인 닉네임입니다.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        비밀번호 *
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="6자 이상 입력하세요"
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

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        비밀번호 확인 *
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="비밀번호를 다시 입력하세요"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {error && <ErrorMessage message={error} />}

                <button
                    type="button"
                    onClick={validateAndNext}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                    다음 단계 →
                </button>
            </div>
        </div>
    );
};

export default Step1BasicInfo;