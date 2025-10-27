import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ExhibitionCard from '../components/common/ExhibitionCard';

const ExhibitionsPage: React.FC = () => {
  const { exhibitions, loading, error } = useData();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-center mb-12">전시</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exhibitions.map((ex) => (
          <Link to={`/exhibitions/${ex.id}`} key={ex.id}>
            <ExhibitionCard
              imageUrl={ex.thumbnailImage}
              title={ex.title}
              subtitle={`${ex.startDate} - ${ex.endDate}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsPage;
