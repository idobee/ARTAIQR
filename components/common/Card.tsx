
import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, onClick }) => {
  return (
    <div 
      className="bg-brand-gray rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-serif font-semibold text-brand-light truncate">{title}</h3>
        <p className="text-sm text-gray-400 group-hover:text-brand-gold transition-colors duration-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
