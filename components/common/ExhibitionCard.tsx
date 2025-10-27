import React from 'react';

interface ExhibitionCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-2xl aspect-[4/3]"
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-white drop-shadow-md">{title}</h3>
        <p className="text-sm text-gray-200 mt-1 drop-shadow-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default ExhibitionCard;
