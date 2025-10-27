import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import type { Artist, Artwork, Exhibition, Curator } from '../types';
import CuratorCard from '../components/common/CuratorCard';
import CuratorDetailModal from '../components/common/CuratorDetailModal';

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};

const CurationPage: React.FC = () => {
  const { curations, artists, artworks, exhibitions, curators, loading, error } = useData();
  const [activeTab, setActiveTab] = useState<'curation' | 'curators'>('curation');
  const [selectedCurator, setSelectedCurator] = useState<Curator | null>(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const findItems = <T extends { id: string }>(ids: string[], source: T[]): T[] => {
    if (!ids || ids.length === 0) return [];
    const sourceMap = new Map(source.map(item => [item.id, item]));
    return ids.map(id => sourceMap.get(id)).filter((item): item is T => !!item);
  };
  
  const renderCurationList = () => (
    <div className="max-w-6xl mx-auto space-y-16">
      {curations.map((curation, index) => {
          const relatedArtists = findItems<Artist>(curation.artistIds || [], artists);
          const relatedArtworks = findItems<Artwork>(curation.artworkIds || [], artworks);
          const relatedExhibitions = findItems<Exhibition>(curation.exhibitionIds || [], exhibitions);
          const curator = curators.find(c => c.id === curation.authorId);
          const embedUrl = curation.videoUrl ? getYouTubeEmbedUrl(curation.videoUrl) : null;
          
          const details = (
            <div>
              <h2 className="text-3xl font-serif text-brand-gold mb-2">{curation.title}</h2>
              <p className="text-sm text-gray-400 mb-4">
                작성자: {curator ? (
                  <button onClick={() => setSelectedCurator(curator)} className="text-brand-light hover:text-brand-gold hover:underline focus:outline-none">
                    {curator.name}
                  </button>
                ) : '알 수 없는 작성자'}
                {curator?.title && <span className="ml-2 text-gray-500">({curator.title})</span>}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">{curation.excerpt}</p>
              
              <div className="space-y-4">
                {relatedArtists.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-brand-light border-b border-brand-dark pb-1 mb-3">관련 작가</h4>
                      <div className="flex flex-wrap gap-2">
                        {relatedArtists.map(artist => (
                          <Link key={artist.id} to={`/artists/${artist.id}`} className="text-sm bg-brand-dark text-brand-gold px-3 py-1 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors">
                          {artist.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                )}
                {relatedArtworks.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-brand-light border-b border-brand-dark pb-1 mb-3">관련 작품</h4>
                      <div className="flex flex-wrap gap-2">
                        {relatedArtworks.map(artwork => (
                          <span key={artwork.id} className="text-sm bg-brand-dark text-gray-300 px-3 py-1 rounded-full">
                          {artwork.title}
                          </span>
                        ))}
                      </div>
                    </div>
                )}
                  {relatedExhibitions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-brand-light border-b border-brand-dark pb-1 mb-3">관련 전시</h4>
                      <div className="flex flex-wrap gap-2">
                        {relatedExhibitions.map(exhibition => (
                          <Link key={exhibition.id} to={`/exhibitions/${exhibition.id}`} className="text-sm bg-brand-dark text-gray-300 px-3 py-1 rounded-full hover:underline">
                          {exhibition.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                )}
              </div>
            </div>
          );

          if (embedUrl) {
              const isReversed = index % 2 !== 0;
              return (
                  <div key={curation.id} className="bg-brand-gray p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center gap-8`}>
                          <div className="w-full md:w-1/2">
                              {details}
                          </div>
                          <div className="w-full md:w-1/2">
                              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                                  <iframe
                                      src={embedUrl}
                                      title={`Video for ${curation.title}`}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                  ></iframe>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          }

          return (
            <div key={curation.id} className="bg-brand-gray p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto">
              {details}
            </div>
          )
      })}
    </div>
  );

  const renderCuratorsList = () => (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {curators.map((curator) => (
          <div key={curator.id} className="block cursor-pointer" onClick={() => setSelectedCurator(curator)}>
            <CuratorCard curator={curator} />
          </div>
        ))}
      </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center text-center mb-8 relative">
        <h1 className="text-4xl font-serif font-bold">큐레이션 & 큐레이터</h1>
        <Link 
          to="/education" 
          className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0 px-4 py-2 text-sm bg-brand-dark border border-brand-gold text-brand-gold rounded-md hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300"
        >
          큐레이션 교육 지원 &rarr;
        </Link>
      </div>
      
      <div className="flex justify-center border-b border-brand-gray mb-12">
        <button
          onClick={() => setActiveTab('curation')}
          className={`px-6 py-3 font-semibold transition-colors duration-300 ${activeTab === 'curation' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}
        >
          큐레이션
        </button>
        <button
          onClick={() => setActiveTab('curators')}
          className={`px-6 py-3 font-semibold transition-colors duration-300 ${activeTab === 'curators' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}
        >
          큐레이터
        </button>
      </div>

      {activeTab === 'curation' ? renderCurationList() : renderCuratorsList()}

      {selectedCurator && (
        <CuratorDetailModal 
          curator={selectedCurator} 
          onClose={() => setSelectedCurator(null)} 
        />
      )}
    </div>
  );
};

export default CurationPage;