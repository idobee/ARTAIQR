import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ExhibitionCard from '../components/common/ExhibitionCard';

// 상대경로에 BASE_URL을 붙이고, 잘못된 접두사를 제거
const normalizeSrc = (src?: string | null): string | undefined => {
  if (!src) return undefined;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
  const clean = src.trim().replace(/^\.?\/?public\/+/i, '').replace(/^\/+/, '');
  if (!clean) return undefined;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/');
  return `${base}${clean}`;
};

const getExhibitionImage = (e: any) =>
  normalizeSrc(e?.thumbnailImage || e?.imageUrl || e?.poster || e?.thumbnail || e?.image);

const ExhibitionsPage: React.FC = () => {
  const { exhibitions = [] } = useData() as any;

  // 디버그: 첫 전시의 원본 키와 최종 src 확인
  useEffect(() => {
    if (exhibitions[0]) {
      const e = exhibitions[0];
      console.debug('[ExhibitionsPage IMG]', {
        raw: {
          thumbnailImage: e.thumbnailImage,
          imageUrl: e.imageUrl,
          poster: e.poster,
          thumbnail: e.thumbnail,
          image: e.image,
        },
        normalized: getExhibitionImage(e),
      });
    }
  }, [exhibitions]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {exhibitions.map((e: any) => {
        const img = getExhibitionImage(e);
        return (
          <Link key={e.id} to={`/exhibitions/${e.id}`} className="block">
            {img ? (
              <img src={img} alt={e.title} className="rounded hover:opacity-90" />
            ) : (
              <div className="aspect-[4/3] rounded bg-black/20" aria-label="no image" />
            )}
            <div className="mt-2 text-sm">{e.title}</div>
          </Link>
        );
      })}
    </section>
  );
};

export default ExhibitionsPage;
