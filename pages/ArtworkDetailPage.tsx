import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams();
  const { artworks = [], artists = [] } = useData();
  const artwork = artworks.find((a: any) => String(a.id) === String(id));
  const artist = artists.find((x: any) => x.id === artwork?.artistId);

  if (!artwork) return <div className="text-gray-400">작품을 찾을 수 없습니다.</div>;

  return (
    <section className="max-w-3xl mx-auto">
      <Link to="/artworks" className="text-brand-gold hover:underline">&larr; 작품 목록으로</Link>
      <h1 className="text-2xl font-semibold text-brand-gold mt-4 mb-4">{artwork.title}</h1>
      {artist && <p className="text-brand-light/80 mb-2">{artist.name}</p>}
      {artwork.imageUrl && <img src={artwork.imageUrl} alt={artwork.title} className="rounded mb-4" />}
      {artwork.description && <p className="text-brand-light/80">{artwork.description}</p>}
    </section>
  );
};

export default ArtworkDetailPage;