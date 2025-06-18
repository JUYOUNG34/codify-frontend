import React from "react";
import { Github , Code , UserPlus , Loader2 } from "lucide-react";
import ErrorMessage from "../common/ErrorMessage";

const Step3TechStack = ({ formData, setFormData, onNext, onPrev, onSubmit, loading, error }) => {
    const techStackCategories = {
        frontend: {
            title: '프론트엔드',
            icon: '🎨',
            techs: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Svelte']
        },
        backend: {
            title: '백엔드',
            icon: '⚙️',
            techs: ['Node.js', 'Java', 'Spring Boot', 'Python', 'Django', 'Flask', 'C#', 'PHP', 'Go', 'Rust']
        },
        mobile: {
            title: '모바일',
            icon: '📱',
            techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin']
        },
        database: {
            title: '데이터베이스',
            icon: '🗄️',
            techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite']
        },
        devops: {
            title: 'DevOps',
            icon: '🚀',
            techs: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Jenkins', 'Linux']
        }
    };

    const handleTechStackToggle = (tech) => {
        setFormData(prev => ({
            ...prev,
            techStacks: prev.techStacks.includes(tech)
                ? prev.techStacks.filter(t => t !== tech)
                : [...prev.techStacks, tech]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">기술 스택 & 추가 정보</h3>
            <div className="space-y-6">
                {/* 기술 스택 선택 */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        관심 기술 스택 ({formData.techStacks.length}개 선택)
                    </label>
                    <div className="space-y-4">
                        {Object.entries(techStackCategories).map(([key, category]) => (
                            <div key={key} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center mb-3">
                                    <span className="text-xl mr-2">{category.icon}</span>
                                    <h4 className="font-semibold text-gray-800">{category.title}</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.techs.map((tech) => (
                                        <button
                                            key={tech}
                                            type="button"
                                            onClick={() => handleTechStackToggle(tech)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                formData.techStacks.includes(tech)
                                                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub 사용자명 */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        GitHub 사용자명 (선택사항)
                    </label>
                    <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="githubUsername"
                            value={formData.githubUsername}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="github.com/username"
                        />
                    </div>
                </div>

                {/* 포트폴리오 URL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        포트폴리오 사이트 (선택사항)
                    </label>
                    <div className="relative">
                        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="https://portfolio.com"
                        />
                    </div>
                </div>

                {/* 자기소개 */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        한 줄 소개 (선택사항)
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="간단한 자기소개를 작성해주세요..."
                    />
                </div>

                {/* 에러 메시지 */}
                {error && <ErrorMessage message={error} />}

                {/* 버튼 그룹 */}
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
                        onClick={onSubmit}
                        disabled={loading}
                        className="flex-2 bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                가입 중...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <UserPlus className="w-5 h-5 mr-2" />
                                회원가입 완료
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step3TechStack;