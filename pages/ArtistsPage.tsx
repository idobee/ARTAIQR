import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const normalizeSrc = (src?: string | null): string | undefined => {
  if (!src) return undefined;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
  const clean = src.trim().replace(/^\.?\/?public\/+/i, '').replace(/^\/+/, '');
  if (!clean) return undefined;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/');
  return `${base}${clean}`;
};

const getArtistImage = (a: any) =>
  normalizeSrc(a?.profileImage || a?.imageUrl || a?.thumbnail || a?.image || a?.avatar);

const ArtistsPage: React.FC = () => {
  const { artists = [] } = useData() as any;

  // 디버그: 첫 작가 이미지 키/최종 src 확인
  useEffect(() => {
    if (artists[0]) {
      const a = artists[0];
      console.debug('[ArtistsPage IMG]', {
        raw: {
          profileImage: a.profileImage,
          imageUrl: a.imageUrl,
          thumbnail: a.thumbnail,
          image: a.image,
          avatar: a.avatar,
        },
        normalized: getArtistImage(a),
      });
    }
  }, [artists]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artists.map((a: any) => {
        const img = getArtistImage(a);
        return (
          <Link key={a.id} to={`/artists/${a.id}`} className="block text-center group">
            {img ? (
              <img
                src={img}
                alt={a.name}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-brand-gray group-hover:border-brand-gold transition-colors duration-300"
              />
            ) : (
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-brand-gray bg-black/20"
                aria-label="no image"
              />
            )}
            <div className="mt-2 text-sm">{a.name}</div>
          </Link>
        );
      })}
    </section>
  );
};

export default ArtistsPage;