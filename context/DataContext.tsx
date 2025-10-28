import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artist, Artwork, Curator, Curation, Exhibition, HeroContent, ArtNews, EducationHistory } from '../types';

// Curriculum 타입을 추가합니다.
interface CurriculumModule {
  title: string;
  details: string;
}

interface CurriculumCategory {
  title: string;
  description: string;
  category: string;
  modules: CurriculumModule[];
}

interface EducationCurriculum {
  beginner: CurriculumCategory;
  intermediate: CurriculumCategory;
  advanced: CurriculumCategory;
  experience: CurriculumCategory;
}

interface Data {
  artists: Artist[];
  artworks: Artwork[];
  curators: Curator[];
  curations: Curation[];
  exhibitions: Exhibition[];
  heroContents: HeroContent[];
  artNews: ArtNews[];
  educationHistory: EducationHistory[];
  educationCurriculum: EducationCurriculum | null; // educationCurriculum 속성을 추가합니다.
  featuredArtistIds: string[];
  featuredExhibitionIds: string[];
}

const DataContext = createContext<Data | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Data>({
    artists: [],
    artworks: [],
    curators: [],
    curations: [],
    exhibitions: [],
    heroContents: [],
    artNews: [],
    educationHistory: [],
    educationCurriculum: null, // 초기값을 null로 설정합니다.
    featuredArtistIds: [],
    featuredExhibitionIds: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/'); // 끝에 슬래시 보장
    const dataUrl = (file: string) => `${base}data/${file}`;

    const files = [
      'artists.json','artworks.json','curators.json','curations.json','exhibitions.json',
      'heroContents.json','art-news.json','educationHistory.json','educationCurriculum.json',
      'featured-artist-ids.json','featured-exhibition-ids.json'
    ];

    (async () => {
      try {
        const resps = await Promise.all(files.map(f => fetch(dataUrl(f))));
        resps.forEach(r => { if (!r.ok) throw new Error(`Failed: ${r.url}`); });
        const json = await Promise.all(resps.map(r => r.json()));
        setData({
          artists: json[0], artworks: json[1], curators: json[2], curations: json[3],
          exhibitions: json[4], heroContents: json[5], artNews: json[6],
          educationHistory: json[7], educationCurriculum: json[8],
          featuredArtistIds: json[9], featuredExhibitionIds: json[10],
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};