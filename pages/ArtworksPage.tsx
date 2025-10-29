import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import ErrorMessage from '../components/common/ErrorMessage.tsx';

// 로드할 아이템 개수를 정의하는 상수를 수정합니다.
const INITIAL_LOAD_COUNT = 40;
const SUBSEQUENT_LOAD_COUNT = 20;

const ArtworksPage: React.FC = () => {
  const { artworks = [], exhibitions = [], artists = [], loading, error } = useData();
  const [selectedExhibition, setSelectedExhibition] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  const filteredArtworks = useMemo(() => {
    if (selectedExhibition === 'all') return artworks;
    return artworks.filter(artwork => artwork.exhibitionIds?.includes(selectedExhibition));
  }, [artworks, selectedExhibition]);

  const visibleArtworks = useMemo(
    () => filteredArtworks.slice(0, visibleCount),
    [filteredArtworks, visibleCount]
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 &&
      visibleCount < filteredArtworks.length
    ) {
      setVisibleCount(prevCount => prevCount + SUBSEQUENT_LOAD_COUNT);
    }
  }, [visibleCount, filteredArtworks.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
    window.scrollTo(0, 0);
  }, [selectedExhibition]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <div>
        <h1 className="text-4xl font-serif font-bold text-center mb-8">작품</h1>

        {/* 전시회 필터 */}
        <div className="mb-8 max-w-md mx-auto">
          <label htmlFor="exhibition-filter" className="block text-sm font-medium text-brand-light mb-2">
            전시회별로 보기:
          </label>
          <select
            id="exhibition-filter"
            value={selectedExhibition}
            onChange={(e) => setSelectedExhibition(e.target.value)}
            className="w-full bg-brand-gray border border-brand-light-2 text-brand-light rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold"
          >
            <option value="all">모든 전시</option>
            {exhibitions.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.title}</option>
            ))}
          </select>
        </div>

        {/* 작품 그리드: 클릭 시 상세 페이지로 이동 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleArtworks.map(artwork => {
            const artist = artists.find(a => a.id === artwork.artistId);
            return (
              <Link
                key={artwork.id}
                to={`/artworks/${artwork.id}`}
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group block"
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-md font-bold text-white truncate" title={artwork.title}>
                    {artwork.title}
                  </h3>
                  {artist && (
                    <p className="text-sm text-gray-300 truncate" title={artist.name}>
                      {artist.name}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {loading && <div className="text-center py-8"><LoadingSpinner /></div>}
        {visibleCount >= filteredArtworks.length && filteredArtworks.length > 0 && (
          <p className="text-center text-brand-light-2 mt-8">모든 작품을 불러왔습니다.</p>
        )}
        {filteredArtworks.length === 0 && (
          <p className="text-center text-brand-light-2 mt-8">해당 전시에 포함된 작품이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default ArtworksPage;