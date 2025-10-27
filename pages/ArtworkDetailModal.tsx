import React from 'react';
import { Artwork, Exhibition } from '../types';
import { useData } from '../context/DataContext.tsx';
import CloseIcon from '../components/icons/CloseIcon.tsx';
import { Link } from 'react-router-dom';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({ artwork, onClose }) => {
  const { exhibitions, artists } = useData();

  if (!artwork) return null;

  const artworkArtist = artists.find(a => a.id === artwork.artistId);

  const participatingExhibitions = exhibitions.filter(ex => 
    artwork.exhibitionIds?.includes(ex.id)
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-brand-gray rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-light hover:text-brand-gold transition-colors z-20"
        >
          <CloseIcon />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* 이미지 영역 (수정됨) */}
          <div className="w-full relative rounded-lg overflow-hidden shadow-lg">
            <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
            
            {/* 이미지 위 정보 오버레이 (추가됨) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-2xl font-serif font-bold text-white mb-1">{artwork.title}</h1>
              {artworkArtist && (
                <Link to={`/artist/${artworkArtist.id}`} className="text-lg text-gray-200 hover:underline block">
                  {artworkArtist.name}
                </Link>
              )}
              <p className="text-sm text-gray-300">{artwork.year} / {artwork.medium}</p>
            </div>
          </div>

          {/* 정보 영역 (수정됨) */}
          <div>
            <h2 className="text-2xl font-semibold text-brand-gold mb-4">작품 설명</h2>
            <div className="prose prose-invert max-w-none text-brand-light-2 mb-6">
              <p>{artwork.description}</p>
            </div>

            {/* 전시 참여 정보 */}
            {participatingExhibitions.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-brand-gold mb-3">전시 참여 정보</h3>
                <ul className="space-y-2">
                  {participatingExhibitions.map(ex => (
                    <li key={ex.id} className="text-brand-light">
                      <Link to={`/exhibition/${ex.id}`} className="hover:text-brand-gold hover:underline transition-colors">
                        - {ex.title} ({ex.period})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailModal;