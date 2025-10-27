import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ArtistCard from '../components/common/ArtistCard';

const ArtistsPage: React.FC = () => {
  const { artists, loading, error } = useData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-center mb-12">작가</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artists.map((artist) => (
          <Link to={`/artists/${artist.id}`} key={artist.id} className="block">
            <ArtistCard
              artist={artist}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;