import React from 'react';
import type { Artist } from '../../types';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div 
      className="text-center group"
    >
      <img 
        src={artist.profileImage} 
        alt={artist.name} 
        className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-brand-gray group-hover:border-brand-gold transition-all duration-300 transform group-hover:scale-105 shadow-lg" 
      />
      <h3 className="mt-4 text-xl font-serif font-semibold text-brand-light">{artist.name}</h3>
      <p className="text-sm text-gray-400 mt-1 line-clamp-3 px-2 group-hover:text-brand-light transition-colors duration-300">{artist.bio}</p>
    </div>
  );
};

export default ArtistCard;