import React from 'react';

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ imageUrl, title, subtitle, onClick }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-2xl aspect-square"
      onClick={onClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-lg font-serif font-bold text-white drop-shadow-md leading-tight">{title}</h3>
        <p className="text-sm text-gray-200 mt-1 drop-shadow-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;