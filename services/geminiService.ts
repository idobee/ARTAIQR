
import { GoogleGenAI } from "@google/genai";
import { Artwork, CurationAudience, CurationLength, CurationTone } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we assume it's set in the environment.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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
  if (!process.env.API_KEY) {
    return Promise.reject(new Error("API key is not configured."));
  }

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
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating curation:", error);
    throw new Error("Failed to generate curation text from AI.");
  }
};
