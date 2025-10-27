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
    const fetchData = async () => {
      try {
        const fileNames = [
          'artists', 'artworks', 'curators', 'curations', 'exhibitions', 
          'heroContents', 'art-news', 'educationHistory', 'educationCurriculum', // educationCurriculum을 로드 목록에 추가
          'featured-artist-ids', 'featured-exhibition-ids'
        ];
        
        const responses = await Promise.all(
          fileNames.map(file => fetch(`/data/${file}.json`))
        );

        responses.forEach(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch ${res.url}`);
          }
        });

        const jsonData = await Promise.all(responses.map(res => res.json()));

        setData({
          artists: jsonData[0],
          artworks: jsonData[1],
          curators: jsonData[2],
          curations: jsonData[3],
          exhibitions: jsonData[4],
          heroContents: jsonData[5],
          artNews: jsonData[6],
          educationHistory: jsonData[7],
          educationCurriculum: jsonData[8], // 가져온 데이터를 상태에 설정합니다.
          featuredArtistIds: jsonData[9],
          featuredExhibitionIds: jsonData[10],
        });
        
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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