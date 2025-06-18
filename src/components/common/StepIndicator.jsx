import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber <= currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                        } ${isCurrent ? 'ring-4 ring-purple-200' : ''}`}>
                            {stepNumber}
                        </div>
                        {stepNumber < totalSteps && (
                            <div className={`h-1 w-16 ${
                                stepNumber < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                            }`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    </div>
);

export default StepIndicator;