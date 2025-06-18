import React, { useState } from 'react';

const ChatRoomCard = ({ initial, name, members, description, tags, bgColor }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center text-white font-bold`}>
                {initial}
            </div>
            <div>
                <h4 className="font-bold text-gray-900">{name}</h4>
                <p className="text-sm text-gray-600">{members}</p>
            </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span key={index} className={`px-2 py-1 ${tag.color} text-xs rounded`}>
          {tag.text}
        </span>
            ))}
        </div>
    </div>
);

export default ChatRoomCard;