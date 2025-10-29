import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ExhibitionCard from '../components/common/ExhibitionCard';
import Button from '../components/common/Button';
import { useData } from '../context/DataContext';
import SparklesIcon from '../components/icons/SparklesIcon';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage: React.FC = () => {
  const {
    heroContents = [],
    artists = [],
    exhibitions = [],
    artNews = [],
    curations = [],
    featuredArtistIds = [],
    featuredExhibitionIds = [],
    loading,
    error,
  } = useData();

  // Hooks: 항상 조건부 return보다 위에 둡니다.
  const [exhibitionIndex, setExhibitionIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const itemsPerPage = 3;

  const featuredArtists = useMemo(
    () => artists.filter(a => featuredArtistIds.includes(a.id)),
    [artists, featuredArtistIds]
  );

  const featuredExhibitions = useMemo(
    () => exhibitions.filter(e => featuredExhibitionIds.includes(e.id)),
    [exhibitions, featuredExhibitionIds]
  );

  const handleExhibitionPrev = useCallback(() => {
    const len = featuredExhibitions.length;
    if (!len) return;
    setExhibitionIndex(prev => (prev === 0 ? Math.max(0, len - itemsPerPage) : prev - 1));
  }, [featuredExhibitions, itemsPerPage]);

  const handleExhibitionNext = useCallback(() => {
    const len = featuredExhibitions.length;
    if (!len) return;
    setExhibitionIndex(prev => (prev >= len - itemsPerPage ? 0 : prev + 1));
  }, [featuredExhibitions, itemsPerPage]);

  useEffect(() => {
    const id = setInterval(handleExhibitionNext, 5000);
    return () => clearInterval(id);
  }, [handleExhibitionNext]);

  useEffect(() => {
    if (!heroContents.length) return;
    const id = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroContents.length);
    }, 30000);
    return () => clearInterval(id);
  }, [heroContents.length]);

  useEffect(() => {
    setExhibitionIndex(prev => Math.min(prev, Math.max(0, featuredExhibitions.length - 1)));
  }, [featuredExhibitions.length]);

  // Guard return은 모든 훅 선언 이후에 위치
  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  // 4. 렌더링에 필요한 나머지 변수들을 계산합니다.
  const visibleExhibitions = featuredExhibitions.slice(exhibitionIndex, exhibitionIndex + itemsPerPage);
  if (visibleExhibitions.length < itemsPerPage && featuredExhibitions.length > itemsPerPage) {
    visibleExhibitions.push(...featuredExhibitions.slice(0, itemsPerPage - visibleExhibitions.length));
  }

  const announcements = [
    { id: 'anno-1', title: 'AI 큐레이터 교육 4기 모집 안내', date: '2024-09-01', content: 'AI 큐레이터 양성 과정 4기 수강생을 모집합니다. 많은 관심 바랍니다.' },
    { id: 'anno-2', title: '서버 점검 안내 (9/15 02:00-04:00)', date: '2024-08-30', content: '보다 나은 서비스 제공을 위해 서버 점검을 실시합니다.' },
  ];

  // 5. 모든 변수가 준비되었으므로, return 구문에서 안전하게 사용합니다.
  return (
    <div className="space-y-24">
      {/* Section 1: Hero Section */}
      <section className="relative h-[60vh] rounded-lg overflow-hidden">
        {heroContents.length > 0 && heroContents.map((hero, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <img src={hero.imageUrl} alt={hero.title} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="relative z-20 p-4 h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg">{hero.title}</h1>
              <p className="mt-4 text-lg md:text-xl text-brand-light max-w-2xl mx-auto drop-shadow-md">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex justify-center gap-4">
                {hero.button1_text && hero.button1_link && <Link to={hero.button1_link}><Button variant="primary">{hero.button1_text}</Button></Link>}
                {hero.button2_text && hero.button2_link && <Link to={hero.button2_link}><Button variant="secondary">{hero.button2_text}</Button></Link>}
              </div>
            </div>
          </div>
        ))}
         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {heroContents.map((_, index) => (
                <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === heroIndex ? 'bg-brand-gold' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </section>

      {/* Section 2: Featured Exhibitions */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-serif font-bold">추천 전시</h2>
          {featuredExhibitions.length > itemsPerPage && (
            <div className="flex space-x-2">
              <button 
                onClick={handleExhibitionPrev} 
                className="p-2 rounded-full bg-brand-gray hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous exhibition"
              >
                <ChevronLeftIcon />
              </button>
              <button 
                onClick={handleExhibitionNext} 
                className="p-2 rounded-full bg-brand-gray hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next exhibition"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleExhibitions.map((ex) => (
            <Link to={`/exhibitions/${ex.id}`} key={ex.id}>
              <ExhibitionCard
                imageUrl={ex.thumbnailImage}
                title={ex.title}
                subtitle={`${ex.startDate} - ${ex.endDate}`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Artist Spotlight & News */}
      <section>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Side: Artist Spotlight */}
          <div className="md:w-3/5">
            <h2 className="text-4xl font-serif font-bold text-center mb-10">주목할 만한 작가</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {featuredArtists.slice(0, 6).map((artist) => (
                <Link to={`/artists/${artist.id}`} key={artist.id} className="flex items-center gap-4 group">
                    <img 
                        src={artist.profileImage} 
                        alt={artist.name} 
                        className="w-32 h-32 flex-shrink-0 rounded-full object-cover border-4 border-brand-gray group-hover:border-brand-gold transition-all duration-300 transform group-hover:scale-105 shadow-lg" 
                    />
                    <div>
                        <h3 className="text-xl font-serif font-semibold text-brand-light group-hover:text-brand-gold transition-colors duration-300">{artist.name}</h3>
                        <p className="mt-1 text-sm text-gray-400 line-clamp-3">
                            {artist.bio}
                        </p>
                    </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/artists">
                <Button variant="secondary">모든 작가 보기</Button>
              </Link>
            </div>
          </div>

          {/* Right Side: News & Announcements */}
          <div className="md:w-2/5 flex flex-col gap-12">
            {/* Art News */}
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-brand-gray pb-4">
                <h2 className="text-3xl font-serif font-bold">아트뉴스</h2>
                <Link to="/art-news" className="text-sm text-brand-gold hover:underline transition-colors">더보기 &rarr;</Link>
              </div>
              <div className="space-y-4">
                {artNews.slice(0, 2).map(news => (
                  <Link to="/art-news" key={news.id} className="block p-4 bg-brand-gray rounded-lg hover:bg-opacity-80 transition-colors duration-300">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lg text-brand-light pr-4">{news.title}</h3>
                      <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{news.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{news.content}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-brand-gray pb-4">
                <h2 className="text-3xl font-serif font-bold">공지사항</h2>
                <Link to="#" className="text-sm text-brand-gold hover:underline transition-colors">더보기 &rarr;</Link>
              </div>
              <div className="space-y-4">
                {announcements.map(item => (
                   <div key={item.id} className="p-4 bg-brand-gray rounded-lg hover:bg-opacity-80 transition-colors duration-300 cursor-pointer">
                    <div className="flex justify-between items-start">
                       <h3 className="font-serif text-lg text-brand-light">{item.title}</h3>
                       <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{item.date}</span>
                     </div>
                     <p className="text-sm text-gray-400 mt-1 line-clamp-1">{item.content}</p>
                 </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: AI Curation Showcase */}
      <section className="bg-brand-gray p-12 rounded-lg text-center">
        <SparklesIcon className="mx-auto text-brand-gold h-12 w-12 mb-4" />
        <h2 className="text-4xl font-serif font-bold mb-4">AI 큐레이션 쇼케이스</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          우리의 진보된 AI는 예술 작품을 분석하여 설득력 있는 이야기를 엮어냅니다. 인증된 회원에게만 제공되는 미래의 예술 큐레이션을 경험해보세요.
        </p>
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
            {curations.filter(c => c.bShowCase).slice(0, 2).map(c => (
                <div key={c.id} className="p-4 border border-brand-dark rounded-md text-left">
                    <h4 className="font-serif text-xl text-brand-gold">{c.title}</h4>
                    <p className="text-gray-400">{c.excerpt}</p>
                </div>
            ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link to="/ai-curator"><Button>AI 큐레이터 사용해보기</Button></Link>
          <Link to="/curation"><Button variant="secondary">모든 큐레이션 보기</Button></Link>
        </div>
      </section>
      
      {/* Section 5: Education & Community */}
       <section>
        <h2 className="text-4xl font-serif font-bold text-center mb-10">교육 & 커뮤니티</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
                <img src="https://picsum.photos/seed/edu/800/600" alt="Education" className="rounded-lg shadow-lg"/>
            </div>
            <div className="md:w-1/2">
                <h3 className="text-3xl font-serif text-brand-gold mb-4">AI 큐레이터 되기</h3>
                <p className="text-gray-300 mb-6">저희 교육 프로그램은 예술적 지식과 최첨단 기술을 결합할 수 있는 기술을 제공합니다. 설득력 있는 이야기를 만드는 법을 배우고 독점적인 AI 도구에 액세스할 수 있는 인증을 받으세요.</p>
                <Link to="/education"><Button variant="secondary">더 알아보기</Button></Link>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;