import React from 'react';

const Step2CareerLevel = ({ formData, setFormData, onNext, onPrev }) => {
    const careerOptions = [
        { value: 'JUNIOR', label: '주니어 (0-2년)', icon: '🌱', desc: '신입 개발자' },
        { value: 'MIDDLE', label: '미들 (3-7년)', icon: '🚀', desc: '경험있는 개발자' },
        { value: 'SENIOR', label: '시니어 (8년+)', icon: '⭐', desc: '숙련된 개발자' }
    ];

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">경력 레벨 선택</h3>
            <p className="text-gray-600 mb-8">본인의 개발 경력을 선택해주세요</p>

            <div className="space-y-4 mb-8">
                {careerOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, careerLevel: option.value }))}
                        className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                            formData.careerLevel === option.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">{option.icon}</div>
                            <div>
                                <div className={`font-semibold text-lg ${
                                    formData.careerLevel === option.value ? 'text-purple-700' : 'text-gray-900'
                                }`}>
                                    {option.label}
                                </div>
                                <div className="text-sm text-gray-500">{option.desc}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex space-x-3">
                <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                    ← 이전
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="flex-2 bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 transition-all"
                >
                    다음 단계 →
                </button>
            </div>
        </div>
    );
};

export default Step2CareerLevel;