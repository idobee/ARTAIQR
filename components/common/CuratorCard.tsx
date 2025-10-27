import React from 'react';
import type { Curator } from '../../types';

interface CuratorCardProps {
  curator: Curator;
}

const CuratorCard: React.FC<CuratorCardProps> = ({ curator }) => {
  return (
    <div className="text-center group">
      <img 
        src={curator.profileImage} 
        alt={curator.name} 
        className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-brand-gray group-hover:border-brand-gold transition-all duration-300 transform group-hover:scale-105 shadow-lg" 
      />
      <h3 className="mt-4 text-xl font-serif font-semibold text-brand-light">{curator.name}</h3>
      <p className="text-sm text-brand-gold mt-1">{curator.title}</p>
    </div>
  );
};

export default CuratorCard;
