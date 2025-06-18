import React, { useState } from 'react';

const FeatureCard = ({ icon, title, description, tags, bgColor }) => (
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
        <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}>
            <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span key={index} className={`px-3 py-1 ${tag.color} text-sm rounded-full`}>
          {tag.text}
        </span>
            ))}
        </div>
    </div>
);

export default FeatureCard;