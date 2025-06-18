import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Step1BasicInfo from '../components/user/Step1BasicInfo';
import Step2CareerLevel from '../components/user/Step2CareerLevel';
import Step3TechStack from '../components/user/Step3TechStack';
import StepIndicator from '../components/common/StepIndicator';
import SuccessScreen from '../components/common/SuccessScreen';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        careerLevel: 'JUNIOR',
        techStacks: [],
        githubUsername: '',
        portfolioUrl: '',
        bio: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const validateStep1 = () => {
        if (!formData.email) {
            setError('이메일을 입력해주세요.');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('올바른 이메일 형식을 입력해주세요.');
            return false;
        }
        if (!formData.nickname) {
            setError('닉네임을 입력해주세요.');
            return false;
        }
        if (formData.nickname.length < 2) {
            setError('닉네임은 2자 이상이어야 합니다.');
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
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
            setError('');
        } else if (currentStep === 2) {
            setCurrentStep(3);
            setError('');
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError('');
        }
    };

    const handleSubmit = async () => {
        if (!validateStep1()) return;

        setLoading(true);
        setError('');

        try {
            const submitData = {
                email: formData.email,
                nickname: formData.nickname,
                password: formData.password,
                careerLevel: formData.careerLevel,
                techStacks: formData.techStacks,
                githubUsername: formData.githubUsername || null,
                portfolioUrl: formData.portfolioUrl || null,
                bio: formData.bio || null
            };

            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                console.log('회원가입 성공:', data);

                setTimeout(() => {
                    alert('회원가입 성공! 메인 페이지로 이동합니다.');
                }, 1500);
            } else {
                setError(data.error || '회원가입에 실패했습니다.');
            }
        } catch (err) {
            console.error('회원가입 요청 실패:', err);
            setError('서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return <SuccessScreen />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Codify 회원가입</h1>
                    <p className="text-gray-600">개발자 커뮤니티에 함께하세요</p>
                </div>

                <StepIndicator currentStep={currentStep} totalSteps={3} />

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {currentStep === 1 && (
                        <Step1BasicInfo
                            formData={formData}
                            setFormData={setFormData}
                            error={error}
                            onNext={handleNextStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <Step2CareerLevel
                            formData={formData}
                            setFormData={setFormData}
                            onNext={handleNextStep}
                            onPrev={handlePrevStep}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3TechStack
                            formData={formData}
                            setFormData={setFormData}
                            onNext={handleNextStep}
                            onPrev={handlePrevStep}
                            onSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    )}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        이미 계정이 있으신가요?{' '}
                        <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                            로그인하기
                        </button>
                    </p>
                </div>

                <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">🔗 백엔드 연동 정보</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>API 엔드포인트:</strong> POST /api/users</p>
                        <p><strong>서버 주소:</strong> http://localhost:8080</p>
                        <p><strong>상태:</strong> <span className="text-green-600">연동 준비 완료</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;