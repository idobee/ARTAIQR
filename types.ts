export interface Artist {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  year: number;
  medium: string;
  imageUrl: string;
  description: string;
  exhibitionIds?: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnailImage: string;
  artistIds: string[];
}

export interface Curator {
  id: string;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
}

export interface Curation {
  id: string;
  title: string;
  authorId: string;
  excerpt: string;
  artistIds?: string[];
  artworkIds?: string[];
  exhibitionIds?: string[];
  videoUrl?: string;
  bShowCase: boolean;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  imageUrl: string;
  button1_text: string;
  button1_link: string;
  button2_text: string;
  button2_link: string;
}

export interface EducationHistory {
  year: string;
  programName: string;
  level: string;
  description: string;
  outcome: string;
}

export enum ArtNewsCategory {
  DOMESTIC = '국내소식',
  INTERNATIONAL = '해외소식',
  ONLINE = '온라인전시',
}

export interface ArtNews {
  id: string;
  category: ArtNewsCategory;
  title: string;
  source: string;
  date: string;
  content: string;
  imageUrl: string;
}

export enum CurationAudience {
  GENERAL = "일반 대중",
  EXPERTS = "미술 전문가",
  CHILDREN = "어린이",
  STUDENTS = "학생",
}

export enum CurationLength {
  SHORT = "짧게",
  MEDIUM = "중간",
  LONG = "길게",
}

export enum CurationTone {
  ACADEMIC = "학술적",
  INFORMATIVE = "정보 전달",
  ENGAGING = "흥미 유발",
  POETIC = "시적",
}
