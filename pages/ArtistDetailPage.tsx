import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ArtworkCard from '../components/common/ArtworkCard';
import ExhibitionCard from '../components/common/ExhibitionCard';
import NotFoundPage from './NotFoundPage';

const ArtistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artists, artworks, exhibitions, loading, error } = useData();

  const artist = useMemo(() => artists.find(a => a.id === id), [id, artists]);

  const artistArtworks = useMemo(() => {
    if (!artist) return [];
    return artworks.filter(art => art.artistId === artist.id);
  }, [artist, artworks]);

  const participatingExhibitions = useMemo(() => {
    if (!artist) return [];
    return exhibitions.filter(ex => ex.artistIds?.includes(artist.id));
  }, [artist, exhibitions]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!artist) return <NotFoundPage />;

  return (
    <div className="space-y-16">
      {/* Artist Profile Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <img
          src={artist.profileImage}
          alt={artist.name}
          className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-brand-gray"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-5xl font-serif font-bold">{artist.name}</h1>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">{artist.bio}</p>
        </div>
      </section>

      {/* Major Artworks Section */}
      {artistArtworks.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">주요 작품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {artistArtworks.map(artwork => (
              <ArtworkCard
                key={artwork.id}
                imageUrl={artwork.imageUrl}
                title={artwork.title}
                subtitle={`${artwork.year}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Participating Exhibitions Section */}
      {participatingExhibitions.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">참여 전시</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {participatingExhibitions.map(exhibition => (
              <Link to={`/exhibitions/${exhibition.id}`} key={exhibition.id}>
                <ExhibitionCard
                  imageUrl={exhibition.thumbnailImage}
                  title={exhibition.title}
                  subtitle={`${exhibition.startDate} - ${exhibition.endDate}`}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArtistDetailPage;