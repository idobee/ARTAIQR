import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import NotFoundPage from './NotFoundPage';

const CuratorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { curators, curations, loading, error } = useData();

  const curator = useMemo(() => curators.find(c => c.id === id), [id, curators]);
  
  const authoredCurations = useMemo(() => {
    if (!curator) return [];
    return curations.filter(c => c.authorId === curator.id);
  }, [curator, curations]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!curator) return <NotFoundPage />;

  return (
    <div className="space-y-16">
      {/* Curator Profile Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <img
          src={curator.profileImage}
          alt={curator.name}
          className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-brand-gray"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-5xl font-serif font-bold">{curator.name}</h1>
          <h2 className="text-2xl font-serif text-brand-gold mt-2">{curator.title}</h2>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">{curator.bio}</p>
        </div>
      </section>

      {/* Authored Curations Section */}
      {authoredCurations.length > 0 && (
        <section>
          <h2 className="text-4xl font-serif font-bold text-center mb-10">작성한 큐레이션</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {authoredCurations.map((curation) => (
              <div key={curation.id} className="bg-brand-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-serif text-brand-gold mb-2">{curation.title}</h3>
                <p className="text-gray-300">{curation.excerpt}</p>
                <Link to="/curation" className="text-brand-gold mt-4 hover:underline inline-block">전체 큐레이션 보기</Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CuratorDetailPage;
