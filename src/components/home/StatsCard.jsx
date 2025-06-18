import React from 'react';

const StatsCard = ({ number, label, color }) => (
    <div className="text-center">
        <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>{number}</div>
        <div className="text-gray-600">{label}</div>
    </div>
);

export default StatsCard;