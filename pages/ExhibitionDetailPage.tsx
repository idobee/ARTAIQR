import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext.tsx';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import ErrorMessage from '../components/common/ErrorMessage.tsx';
import ArtistCard from '../components/common/ArtistCard.tsx';
import NotFoundPage from './NotFoundPage.tsx';
// Artwork, Curator 타입을 가져옵니다.
import type { Curator, Artwork } from '../types'; 
import CuratorDetailModal from '../components/common/CuratorDetailModal.tsx';
// ArtworkDetailModal을 가져옵니다.
import ArtworkDetailModal from './ArtworkDetailModal.tsx'; 

const ExhibitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { exhibitions, artists, artworks, curations, curators, loading, error } = useData();
  
  // 모달 상태를 관리합니다.
  const [selectedCurator, setSelectedCurator] = useState<Curator | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const exhibition = useMemo(() => exhibitions.find(e => e.id === id), [id, exhibitions]);
  
  const participatingArtists = useMemo(() => {
    if (!exhibition?.artistIds) return [];
    return artists.filter(a => exhibition.artistIds?.includes(a.id));
  }, [exhibition, artists]);
  
  const exhibitedArtworks = useMemo(() => {
    if (!exhibition) return [];
    return artworks.filter(art => art.exhibitionIds?.includes(exhibition.id));
  }, [exhibition, artworks]);

  const relatedCurations = useMemo(() => {
    if (!exhibition) return [];
    // ID를 기반으로 관련 큐레이션을 찾도록 로직을 수정합니다.
    return curations.filter(c => c.exhibitionId === exhibition.id);
  }, [exhibition, curations]);

  if (loading) return <div className="text-center py-20"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!exhibition) return <NotFoundPage />;

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="relative h-[50vh] rounded-lg overflow-hidden flex items-center justify-center text-center p-4">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <img src={exhibition.thumbnailImage} alt={exhibition.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">{exhibition.title}</h1>
          <p className="mt-4 text-lg text-brand-light drop-shadow-md">{exhibition.period}</p>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-300 leading-relaxed text-center">{exhibition.description}</p>
      </section>

      {/* 1. Participating Artists Section */}
      {participatingArtists.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">참여 작가</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {participatingArtists.map(artist => (
              <Link to={`/artist/${artist.id}`} key={artist.id} className="block">
                <ArtistCard artist={artist} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. Exhibited Artworks Section (수정됨) */}
      {exhibitedArtworks.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">전시 작품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {exhibitedArtworks.map(artwork => {
              const artist = artists.find(a => a.id === artwork.artistId);
              return (
                // 작품 카드를 클릭하면 모달이 열리도록 수정
                <div key={artwork.id} onClick={() => setSelectedArtwork(artwork)} className="cursor-pointer">
                  <div className="relative rounded-lg overflow-hidden shadow-lg group">
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
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Related Curations Section */}
      {relatedCurations.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">관련 큐레이션</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {relatedCurations.map((curation) => {
              const curator = curators.find(c => c.id === curation.authorId);
              return (
                <div key={curation.id} className="bg-brand-gray p-6 rounded-lg shadow-lg transition-transform hover:-translate-y-1">
                  <h3 className="text-2xl font-serif text-brand-gold mb-2">{curation.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    작성자: {curator ? (
                      <button onClick={() => setSelectedCurator(curator)} className="text-brand-light hover:text-brand-gold hover:underline focus:outline-none">
                        {curator.name}
                      </button>
                    ) : (curation.authorId || '알 수 없는 작성자')}
                  </p>
                  <p className="text-gray-300">{curation.excerpt}</p>
                  <Link to={`/curation/${curation.id}`} className="text-brand-gold mt-4 hover:underline inline-block">
                    더 보기 &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 모달 렌더링 영역 */}
      {selectedCurator && (
        <CuratorDetailModal 
          curator={selectedCurator} 
          onClose={() => setSelectedCurator(null)} 
        />
      )}
      {/* 작품 상세 정보 모달 추가 */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
};

export default ExhibitionDetailPage;