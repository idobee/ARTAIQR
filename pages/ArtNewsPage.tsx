import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { ArtNewsCategory } from '../types';
import ArtNewsCard from '../components/common/ArtNewsCard';

const ArtNewsPage: React.FC = () => {
  const { artNews, loading, error } = useData();
  const [filter, setFilter] = useState<ArtNewsCategory | 'all'>('all');

  const categories = [
    { key: 'all', name: '전체' },
    { key: ArtNewsCategory.DOMESTIC, name: '국내소식' },
    { key: ArtNewsCategory.INTERNATIONAL, name: '해외소식' },
    { key: ArtNewsCategory.ONLINE, name: '온라인전시' },
  ];

  const filteredNews = useMemo(() => {
    if (filter === 'all') {
      return artNews;
    }
    return artNews.filter(item => item.category === filter);
  }, [filter, artNews]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-center mb-8">아트뉴스</h1>
      
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setFilter(category.key as ArtNewsCategory | 'all')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              filter === category.key
                ? 'bg-brand-gold text-brand-dark'
                : 'bg-brand-gray text-brand-light hover:bg-brand-gold hover:text-brand-dark'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map(newsItem => (
          <ArtNewsCard key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default ArtNewsPage;