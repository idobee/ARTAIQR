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
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub Pages에서 서빙될 정적 경로
const DATA_DIR = path.join(__dirname, '../public/data');

// 실제 시트 ID로 교체하세요.
const SHEET_ID = '1-Q4dORHD1CFqYvTFK891lVm2T3IcfiO0PhNgCYcgf-M';

const SHEET_CONFIGS = {
  artists:               { gid: '537939978',               outputFile: 'artists.json' },
  artworks:              { gid: '1407700198',              outputFile: 'artworks.json' },
  curators:              { gid: '695148169',               outputFile: 'curators.json' },
  curations:             { gid: '1053784494',              outputFile: 'curations.json' },
  educationHistory:      { gid: '487311061',               outputFile: 'educationHistory.json' },
  educationCurriculum:   { gid: '925895811',               outputFile: 'educationCurriculum.json' },
  heroContents:          { gid: '1304975179',              outputFile: 'heroContents.json' },
  artNews:               { gid: '2041682140',              outputFile: 'art-news.json' },
  featuredArtistIds:     { gid: '1008375315',              outputFile: 'featured-artist-ids.json' },
  exhibitions:           { gid: '0',                       outputFile: 'exhibitions.json' },
  featuredExhibitionIds: { gid: '446645403',               outputFile: 'featured-exhibition-ids.json' },
  artistInExhibition:    { gid: '486094120',               outputFile: '' }, // 관계 설정용
  artworkInExhibition:   { gid: '596902498',               outputFile: '' }, // 관계 설정용
} as const;

type Row = Record<string, string>;

// CSV 파서(따옴표/콤마 포함 행 처리)
function parseCsv(csv: string): Row[] {
  const lines = csv.replace(/\r/g, '').split('\n').filter(Boolean);
  if (lines.length < 2) return [];
  const header = splitCsvLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const cols = splitCsvLine(line).map(v => v.replace(/^"|"$/g, ''));
    const row: Row = {};
    header.forEach((h, i) => { row[h] = cols[i] ?? ''; });
    return row;
  });
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' ) {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

const parseList = (v: string) => v ? v.split(',').map(s => s.trim()).filter(Boolean) : [];
const parseBool = (v: string) => v?.toLowerCase() === 'true';

async function fetchCsvByGid(gid: string): Promise<Row[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  const text = await res.text();
  return parseCsv(text);
}

async function main() {
  console.log('🚀 Sync Google Sheets -> public/data ...');
  await fs.mkdir(DATA_DIR, { recursive: true });

  const entries = Object.entries(SHEET_CONFIGS);
  const rawMap = new Map<string, Row[]>();

  // 1) 병렬 가져오기
  await Promise.all(entries.map(async ([key, cfg]) => {
    try {
      const rows = await fetchCsvByGid(cfg.gid);
      rawMap.set(key, rows);
      console.log(`  - ${key}: ${rows.length} rows`);
    } catch (e) {
      console.warn(`  ! ${key} load failed: ${(e as Error).message}`);
      rawMap.set(key, []);
    }
  }));

  // 2) 관계/가공
  const exhibitionIdMap = new Map((rawMap.get('exhibitions') || []).map(r => [r['전시회'], r['전시회아이디']]));
  const exArtists = new Map<string, string[]>();
  (rawMap.get('artistInExhibition') || []).forEach(r => {
    const exId = exhibitionIdMap.get(r['전시회']);
    const artistId = r['전시작가명아이디'];
    if (!exId || !artistId) return;
    if (!exArtists.has(exId)) exArtists.set(exId, []);
    exArtists.get(exId)!.push(artistId);
  });

  const artworkExMap = new Map<string, string[]>();
  (rawMap.get('artworkInExhibition') || []).forEach(r => {
    const exId = exhibitionIdMap.get(r['전시회']);
    const artworkId = r['전시작품아이디'];
    if (!exId || !artworkId) return;
    if (!artworkExMap.has(artworkId)) artworkExMap.set(artworkId, []);
    artworkExMap.get(artworkId)!.push(exId);
  });

  // 3) 최종 JSON
  const out: Record<string, any> = {};

  out.artists = (rawMap.get('artists') || []).map(r => ({
    id: r['id'], name: r['name'], bio: r['bio'], profileImage: r['profileImage']
  }));

  out.artworks = (rawMap.get('artworks') || []).map(r => ({
    id: r['id'], title: r['title'], artistId: r['artistId'], artistName: r['artistName'],
    year: Number(r['year'] || 0), medium: r['medium'], imageUrl: r['imageUrl'],
    description: r['description'], exhibitionIds: artworkExMap.get(r['id']) || []
  }));

  out.exhibitions = (rawMap.get('exhibitions') || []).map(r => {
    const [startDate, endDate] = (r['전시기간'] || '').split('~').map(s => s?.trim()) as [string, string];
    return {
      id: r['전시회아이디'],
      title: r['전시회'],
      description: r['전시요약'],
      startDate: startDate || '미정',
      endDate: endDate || '미정',
      thumbnailImage: r['이미지위치정보'] || `https://picsum.photos/seed/${r['전시회아이디']}/600/400`,
      artistIds: exArtists.get(r['전시회아이디']) || []
    };
  });

  out.curators = (rawMap.get('curators') || []).map(r => ({
    id: r['id'], name: r['name'], title: r['title'], bio: r['bio'], profileImage: r['profileImage']
  }));

  out.curations = (rawMap.get('curations') || []).map(r => ({
    id: r['id'], title: r['title'], authorId: r['authorId'], excerpt: r['excerpt'],
    artistIds: parseList(r['artistIds']), artworkIds: parseList(r['artworkIds']),
    exhibitionIds: parseList(r['exhibitionIds']), videoUrl: r['videoUrl'] || undefined,
    bShowCase: parseBool(r['bShowCase'])
  }));

  out.educationHistory = (rawMap.get('educationHistory') || []).map(r => ({
    year: r['year'], programName: r['programName'], description: r['description'],
    outcome: r['outcome'], level: r['level'] || undefined
  }));

  out.heroContents = (rawMap.get('heroContents') || []).map(r => ({
    title: r['title'], subtitle: r['subtitle'], imageUrl: r['imageUrl'],
    button1_text: r['button1_text'], button1_link: r['button1_link'],
    button2_text: r['button2_text'], button2_link: r['button2_link']
  }));

  out.artNews = (rawMap.get('artNews') || []).map(r => ({
    id: r['id'], category: r['category'], title: r['title'],
    source: r['source'], date: r['date'], content: r['content'], imageUrl: r['imageUrl']
  }));

  out.featuredArtistIds = (rawMap.get('featuredArtistIds') || []).map(r => r['id']);
  out.featuredExhibitionIds = (rawMap.get('featuredExhibitionIds') || []).map(r => r['전시회아이디']);

  out.educationCurriculum = (rawMap.get('educationCurriculum') || []).reduce((acc, r) => {
    const id = r['id'];
    if (!id) return acc;
    if (!acc[id]) acc[id] = { title: r['title'], description: r['description'], category: r['category'], modules: [] as any[] };
    acc[id].modules.push({ title: r['module_title'], details: r['module_details'] });
    return acc;
  }, {} as Record<string, { title: string; description: string; category: string; modules: { title: string; details: string }[] }>);

  // 4) 저장(빈 데이터면 덮어쓰기 생략)
  for (const [key, cfg] of entries) {
    const data = (out as any)[key];
    if (!cfg.outputFile) continue;
    const file = path.join(DATA_DIR, cfg.outputFile);

    const isEmpty =
      (Array.isArray(data) && data.length === 0) ||
      (data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0);

    if (isEmpty) {
      console.warn(`  ! skip write (empty): ${cfg.outputFile}`);
      continue;
    }
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`  - wrote: ${cfg.outputFile}`);
  }

  console.log('✅ Sync completed.');
}

main().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});