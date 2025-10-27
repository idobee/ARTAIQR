import React from 'react';
import type { ArtNews } from '../../types';

interface ArtNewsCardProps {
  newsItem: ArtNews;
}

const ArtNewsCard: React.FC<ArtNewsCardProps> = ({ newsItem }) => {
  return (
    <div className="bg-brand-gray rounded-lg overflow-hidden group flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-2xl">
      <div className="aspect-video">
        <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                newsItem.category === '국내소식' ? 'bg-blue-900 text-blue-200' :
                newsItem.category === '해외소식' ? 'bg-purple-900 text-purple-200' :
                'bg-green-900 text-green-200'
            }`}>{newsItem.category}</span>
            <p className="text-xs text-gray-400">{newsItem.date}</p>
        </div>
        <h3 className="text-xl font-serif font-semibold text-brand-light flex-grow">{newsItem.title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3 flex-grow">{newsItem.content}</p>
        <div className="mt-4 pt-4 border-t border-brand-dark text-right">
             <p className="text-xs text-gray-500">출처: {newsItem.source}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtNewsCard;