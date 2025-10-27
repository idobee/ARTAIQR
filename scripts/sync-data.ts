// scripts/sync-data.ts
/**
 * =================================================================================
 * Google Sheet 데이터 동기화 스크립트
 * =================================================================================
 * 설명:
 * 이 스크립트는 Google Sheet에 있는 모든 콘텐츠를 가져와 프로젝트의 'data' 폴더에
 * 정적 JSON 파일로 생성합니다. 이를 통해 앱은 빠르고 안정적으로 데이터를 로드할 수 있습니다.
 *
 * 사용법:
 * 1. (최초 1회) 필요한 패키지를 설치합니다: npm install -D node-fetch ts-node
 * 2. 아래 `SHEET_ID`와 `SHEET_CONFIGS`의 `gid` 값을 실제 Google Sheet 정보로 수정합니다.
 * 3. 터미널에서 `npm run sync-data` 명령어를 실행합니다.
 *
 * 주의:
 * - 이 스크립트를 실행하면 'data' 폴더의 JSON 파일들이 덮어쓰기 됩니다.
 * - Google Sheet는 '링크가 있는 모든 사용자가 볼 수 있도록' 공유 설정되어야 합니다.
 * =================================================================================
 */
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import process from 'node:process';

// --- 설정 (사용자가 수정해야 할 부분) ---
const SHEET_ID = '1-Q4dORHD1CFqYvTFK891lVm2T3IcfiO0PhNgCYcgf-M'; // Google Sheet 문서의 ID

const SHEET_CONFIGS = {
  artists:              { gid: '537939978',              outputFile: 'artists.json' },
  artworks:             { gid: '1407700198',             outputFile: 'artworks.json' },
  curators:             { gid: '695148169',             outputFile: 'curators.json' },
  curations:            { gid: '1053784494',            outputFile: 'curations.json' },
  educationHistory:     { gid: '487311061',    outputFile: 'educationHistory.json' },
  educationCurriculum:  { gid: '925895811',    outputFile: 'educationCurriculum.json' },
  heroContents:         { gid: '1304975179',        outputFile: 'heroContents.json' },
  artNews:              { gid: '2041682140',                    outputFile: 'art-news.json' },
  featuredArtistIds:    { gid: '1008375315',     outputFile: 'featured-artist-ids.json' },
  exhibitions:          { gid: '0',                             outputFile: 'exhibitions.json' },
  featuredExhibitionIds:{ gid: '446645403',                     outputFile: 'featured-exhibition-ids.json' },
  artistInExhibition:   { gid: '486094120',                     outputFile: '' },
  artworkInExhibition:  { gid: '596902498',                     outputFile: '' },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// --- 데이터 파싱 및 변환 함수 ---

const fetchSheet = async (gid: string) => {
  console.log(`  - GID: ${gid} 시트를 가져오는 중...`);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`시트(GID: ${gid})를 가져오는데 실패했습니다. 상태: ${response.status}`);
  }
  return response.text();
};

const parseCsv = (csvText: string): Record<string, string>[] => {
  const lines = csvText.trim().replace(/\r/g, '').split('\n');
  if (lines.length < 2) return [];
  const header = lines.shift()!.split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
    return header.reduce((obj, col, index) => {
      obj[col] = values[index] || '';
      return obj;
    }, {} as Record<string, string>);
  });
};

const parseStringToArray = (str: string) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];
const parseStringToBoolean = (str: string) => str ? str.toUpperCase() === 'TRUE' : false;

// --- 메인 실행 로직 ---

async function main() {
  console.log('🚀 Google Sheet 데이터 동기화를 시작합니다...');
  
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // 1. 모든 시트 데이터를 병렬로 가져오기
    console.log('1. Google Sheet에서 모든 데이터를 가져옵니다...');
    const rawDataPromises = Object.entries(SHEET_CONFIGS).map(async ([key, config]) => {
      try {
        const csv = await fetchSheet(config.gid);
        return { key, data: parseCsv(csv) };
      } catch (error) {
        console.error(`'${key}' 데이터를 가져오는 중 오류 발생:`, error);
        return { key, data: [] };
      }
    });
    const allRawData = await Promise.all(rawDataPromises);
    const rawDataMap = new Map(allRawData.map(d => [d.key, d.data]));

    // 2. 데이터 가공 및 관계 설정
    console.log('2. 데이터를 가공하고 관계를 설정합니다...');
    
    const exhibitionArtistsMap = new Map<string, string[]>();
    const artistInExhibitionData = rawDataMap.get('artistInExhibition') || [];
    const exhibitionIdMap = new Map((rawDataMap.get('exhibitions') || []).map(e => [e['전시회'], e['전시회아이디']]));

    artistInExhibitionData.forEach(row => {
      const exId = exhibitionIdMap.get(row['전시회']);
      if (exId && row['전시작가명아이디']) {
        if (!exhibitionArtistsMap.has(exId)) exhibitionArtistsMap.set(exId, []);
        exhibitionArtistsMap.get(exId)!.push(row['전시작가명아이디']);
      }
    });

    const artworkExhibitionMap = new Map<string, string[]>();
    const artworkInExhibitionData = rawDataMap.get('artworkInExhibition') || [];
    artworkInExhibitionData.forEach(row => {
        const exId = exhibitionIdMap.get(row['전시회']);
        if (exId && row['전시작품아이디']) {
            if (!artworkExhibitionMap.has(row['전시작품아이디'])) artworkExhibitionMap.set(row['전시작품아이디'], []);
            artworkExhibitionMap.get(row['전시작품아이디'])!.push(exId);
        }
    });

    const finalJsonData: { [key: string]: any } = {};

    finalJsonData.artists = (rawDataMap.get('artists') || []).map(r => ({ id: r['id'], name: r['name'], bio: r['bio'], profileImage: r['profileImage'] }));
    finalJsonData.artworks = (rawDataMap.get('artworks') || []).map(r => ({ id: r['id'], title: r['title'], artistId: r['artistId'], artistName: r['artistName'], year: parseInt(r['year'], 10) || 0, medium: r['medium'], imageUrl: r['imageUrl'], description: r['description'], exhibitionIds: artworkExhibitionMap.get(r['id']) || [] }));
    finalJsonData.exhibitions = (rawDataMap.get('exhibitions') || []).map(r => {
      const [startDate, endDate] = r['전시기간'] ? r['전시기간'].split('~').map(d => d.trim()) : ['미정', '미정'];
      return { id: r['전시회아이디'], title: r['전시회'], description: r['전시요약'], startDate, endDate, thumbnailImage: r['이미지위치정보'] || `https://picsum.photos/seed/${r['전시회아이디']}/600/400`, artistIds: exhibitionArtistsMap.get(r['전시회아이디']) || [] };
    });
    finalJsonData.curators = (rawDataMap.get('curators') || []).map(r => ({ id: r['id'], name: r['name'], title: r['title'], bio: r['bio'], profileImage: r['profileImage'] }));
    finalJsonData.curations = (rawDataMap.get('curations') || []).map(r => ({ id: r['id'], title: r['title'], authorId: r['authorId'], excerpt: r['excerpt'], artistIds: parseStringToArray(r['artistIds']), artworkIds: parseStringToArray(r['artworkIds']), exhibitionIds: parseStringToArray(r['exhibitionIds']), videoUrl: r['videoUrl'] || undefined, bShowCase: parseStringToBoolean(r['bShowCase']) }));
    finalJsonData.educationHistory = (rawDataMap.get('educationHistory') || []).map(r => ({ year: r['year'], programName: r['programName'], description: r['description'], outcome: r['outcome'], level: r['level'] || undefined }));
    finalJsonData.heroContents = (rawDataMap.get('heroContents') || []).map(r => ({ title: r['title'], subtitle: r['subtitle'], imageUrl: r['imageUrl'], button1_text: r['button1_text'], button1_link: r['button1_link'], button2_text: r['button2_text'], button2_link: r['button2_link'] }));
    finalJsonData.artNews = (rawDataMap.get('artNews') || []).map(r => ({ id: r['id'], category: r['category'], title: r['title'], source: r['source'], date: r['date'], content: r['content'], imageUrl: r['imageUrl'] }));
    finalJsonData.featuredArtistIds = (rawDataMap.get('featuredArtistIds') || []).map(r => r['id']);
    finalJsonData.featuredExhibitionIds = (rawDataMap.get('featuredExhibitionIds') || []).map(r => r['전시회아이디']);

    // --- 교육 커리큘럼 데이터 가공 (수정된 부분) ---
    finalJsonData.educationCurriculum = (rawDataMap.get('educationCurriculum') || []).reduce((acc, row) => {
      const id = row['id'];
      if (!id) return acc;
      if (!acc[id]) {
        acc[id] = { title: row['title'], description: row['description'], category: row['category'], modules: [] };
      }
      acc[id].modules.push({ title: row['module_title'], details: row['module_details'] });
      return acc;
    }, {} as Record<string, any>);

    // 3. JSON 파일로 저장 (단순화된 로직)
    console.log('3. 가공된 데이터를 JSON 파일로 저장합니다...');
    for (const key in finalJsonData) {
      const config = SHEET_CONFIGS[key as keyof typeof SHEET_CONFIGS];
      if (config && config.outputFile) {
        const filePath = path.join(DATA_DIR, config.outputFile);
        await fs.writeFile(filePath, JSON.stringify(finalJsonData[key], null, 2));
        console.log(`  - ✅ ${config.outputFile} 파일이 성공적으로 저장되었습니다.`);
      }
    }

    console.log('\n🎉 모든 데이터 동기화가 성공적으로 완료되었습니다!');
  } catch (error) {
    console.error('\n❌ 데이터 동기화 중 심각한 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

main();