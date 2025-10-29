import React from 'react';

type Artwork = {
  id: string | number;
  title?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  artistName?: string;
};

type Props = {
  artwork: Artwork | null;
  onClose: () => void;
};

const ArtworkDetailModal: React.FC<Props> = ({ artwork, onClose }) => {
  if (!artwork) return null;
  const src = artwork.imageUrl || artwork.image;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white text-black max-w-2xl w-full rounded p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">{artwork.title ?? '작품 상세'}</h2>
          <button onClick={onClose} className="px-2 py-1 border rounded">닫기</button>
        </div>
        {src && <img src={src} alt={artwork.title ?? 'artwork'} className="rounded mb-3 max-h-[70vh] object-contain w-full" />}
        {artwork.description && <p className="text-gray-700">{artwork.description}</p>}
      </div>
    </div>
  );
};

export default ArtworkDetailModal;