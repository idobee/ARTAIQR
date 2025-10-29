import { GoogleGenerativeAI } from '@google/generative-ai';
import { Artwork, CurationAudience, CurationLength, CurationTone } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY && API_KEY.length > 0) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.warn('VITE_GEMINI_API_KEY is missing. Gemini features will be disabled.');
}

interface CurationParams {
  artworks: Artwork[];
  theme: string;
  audience: CurationAudience;
  length: CurationLength;
  tone: CurationTone;
}

const generateLengthString = (length: CurationLength): string => {
  switch (length) {
    case CurationLength.SHORT:
      return "400-600단어";
    case CurationLength.MEDIUM:
      return "800-1000단어";
    case CurationLength.LONG:
      return "1200-1500단어";
    default:
      return "800-1000단어";
  }
}

export const generateCuration = async ({ artworks, theme, audience, length, tone }: CurationParams): Promise<string> => {
  if (!genAI) return 'AI 기능이 비활성화되어 기본 안내를 표시합니다.';
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const artworkList = artworks.map(art => `* ${art.title} - ${art.artistName} (${art.year})`).join('\n');

  const prompt = `
당신은 전문 미술 큐레이터입니다. 다음 작품들을 "${theme}"라는 테마로 연결하는 전시 큐레이션 원고를 작성해주세요.

작품 목록:
${artworkList}

타겟 관객: ${audience}
톤앤매너: ${tone}
원고 길이: ${generateLengthString(length)}

각 작품의 의미, 작품 간의 연결고리, 그리고 전시 전체를 아우르는 메시지를 포함하여 깊이 있고 매력적인 글을 작성해주세요.
`;

  try {
    const response = await model.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
    });
    return response.response.text();
  } catch (error) {
    console.error("Error generating curation:", error);
    throw new Error("Failed to generate curation text from AI.");
  }
};
