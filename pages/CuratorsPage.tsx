import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import CuratorCard from '../components/common/CuratorCard';

const CuratorsPage: React.FC = () => {
  const { curators, loading, error } = useData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-center mb-12">큐레이터</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {curators.map((curator) => (
          <Link to={`/curators/${curator.id}`} key={curator.id} className="block">
            <CuratorCard curator={curator} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CuratorsPage;
