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

const normalizeSrc = (src?: string | null): string | undefined => {
  if (!src) return undefined;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
  const clean = src.trim().replace(/^\.?\/?public\/+/i, '').replace(/^\/+/, '');
  if (!clean) return undefined;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/'); // '/ARTAIQR/'
  return `${base}${clean}`;
};

const HomePage: React.FC = () => {
  // 기본값 추가로 안전하게
  const {
    artists = [],
    exhibitions = [],
    curations = [],
    heroContents = [],
    curators = [],
    featuredArtistIds = [],
    featuredExhibitionIds = [],
    loading,
    error,
  } = useData() as any;

  const featuredExhibitions = useMemo(
    () => exhibitions.filter(e => featuredExhibitionIds.includes(e.id)),
    [exhibitions, featuredExhibitionIds]
  );

  const featuredArtists = useMemo(
    () => artists.filter(a => featuredArtistIds.includes(a.id)),
    [artists, featuredArtistIds]
  );

  const [exhibitionIndex, setExhibitionIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const itemsPerPage = 3;

  const handleExhibitionPrev = useCallback(() => {
    if (featuredExhibitions.length === 0) return;
    setExhibitionIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, featuredExhibitions.length - itemsPerPage) : prevIndex - 1
    );
  }, [featuredExhibitions.length, itemsPerPage]);

  const handleExhibitionNext = useCallback(() => {
    if (featuredExhibitions.length === 0) return;
    setExhibitionIndex((prevIndex) =>
      prevIndex >= featuredExhibitions.length - itemsPerPage ? 0 : prevIndex + 1
    );
  }, [featuredExhibitions.length, itemsPerPage]);
  
  useEffect(() => {
    const timer = setInterval(handleExhibitionNext, 5000);
    return () => clearInterval(timer);
  }, [handleExhibitionNext]);

  useEffect(() => {
    if (!heroContents || heroContents.length === 0) return;
    const heroTimer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroContents.length);
    }, 30000); // 롤링 간격을 30초로 변경
    return () => clearInterval(heroTimer);
  }, [heroContents]);

  // 디버그 useEffect는 조건부 return 위로 이동해 훅 순서 고정
  useEffect(() => {
    if (heroContents?.[0]) {
      const h = heroContents[0] as any;
      console.debug('[HERO IMG]', { raw: h.imageUrl, normalized: normalizeSrc(h.imageUrl || h.image || h.coverImage) });
    }
    if (featuredExhibitions?.[0]) {
      const e = featuredExhibitions[0] as any;
      console.debug('[EXHIBITION IMG]', {
        raw: { thumbnailImage: e.thumbnailImage, imageUrl: e.imageUrl, poster: e.poster, thumbnail: e.thumbnail, image: e.image },
        normalized: normalizeSrc(e.thumbnailImage || e.imageUrl || e.poster || e.thumbnail || e.image),
      });
    }
    if (featuredArtists?.[0]) {
      const a = featuredArtists[0] as any;
      console.debug('[ARTIST IMG]', {
        raw: { profileImage: a.profileImage, imageUrl: a.imageUrl, thumbnail: a.thumbnail, image: a.image, avatar: a.avatar },
        normalized: normalizeSrc(a.profileImage || a.imageUrl || a.thumbnail || a.image || a.avatar),
      });
    }
  }, [heroContents, featuredExhibitions, featuredArtists]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const visibleExhibitions = featuredExhibitions.slice(exhibitionIndex, exhibitionIndex + itemsPerPage);
  if (visibleExhibitions.length < itemsPerPage && featuredExhibitions.length > itemsPerPage) {
    visibleExhibitions.push(...featuredExhibitions.slice(0, itemsPerPage - visibleExhibitions.length));
  }

  return (
    <div className="space-y-24">
      {/* Section 1: Hero Section */}
      <section className="relative h-[60vh] rounded-lg overflow-hidden">
        {heroContents.length > 0 && heroContents.map((hero, index) => {
          const heroImg = normalizeSrc(hero.imageUrl || (hero as any).image || (hero as any).coverImage);
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              {heroImg && (
                <img
                  src={heroImg}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
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
          );
        })}
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
          {visibleExhibitions.map((ex) => {
            const exImg = normalizeSrc(
              (ex as any).thumbnailImage || (ex as any).imageUrl || (ex as any).poster || (ex as any).thumbnail || (ex as any).image
            );
            return (
              <Link to={`/exhibitions/${ex.id}`} key={ex.id}>
                <ExhibitionCard
                  imageUrl={exImg}
                  title={ex.title}
                  subtitle={`${ex.startDate} - ${ex.endDate}`}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section 3: Artist Spotlight */}
      <section>
        <h2 className="text-4xl font-serif font-bold text-center mb-10">주목할 만한 작가</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredArtists.slice(0, 8).map((artist) => {
            const artistImg = normalizeSrc(
              (artist as any).profileImage || (artist as any).imageUrl || (artist as any).thumbnail || (artist as any).image || (artist as any).avatar
            );
            return (
              <Link to={`/artists/${artist.id}`} key={artist.id} className="block text-center group">
                {artistImg ? (
                  <img
                    src={artistImg}
                    alt={artist.name}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-brand-gray group-hover:border-brand-gold transition-colors duration-300"
                  />
                ) : (
                  <div
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-brand-gray bg-black/30"
                    aria-label="no image"
                  />
                )}
                <h3 className="mt-4 text-xl font-serif font-semibold">{artist.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 px-2">{artist.bio}</p>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
            <Link to="/artists">
                <Button variant="secondary">모든 작가 보기</Button>
            </Link>
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