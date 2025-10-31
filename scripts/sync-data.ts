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
import path from 'node:path';
import fetch from 'node-fetch';
// Fix: Import `fileURLToPath` to resolve `__dirname` in ES modules, and import `process` to fix type error.
import { fileURLToPath } from 'url';
// Fix: Changed to a default import for 'process' as required by the module's export structure and to resolve the esModuleInterop-related error.
import process from 'node:process';

// --- 설정 (사용자가 수정해야 할 부분) ---
const SHEET_ID = '1-Q4dORHD1CFqYvTFK891lVm2T3IcfiO0PhNgCYcgf-M'; // Google Sheet 문서의 ID

// 각 시트의 GID와 출력 파일명을 정의합니다.
// GID는 Google Sheet URL에서 확인할 수 있습니다. (예: .../edit#gid=123456789)
const SHEET_CONFIGS = {
  artists:              { gid: '537939978',              outputFile: 'artists.json' },
  artworks:             { gid: '1407700198',             outputFile: 'artworks.json' },
  curators:             { gid: '695148169',             outputFile: 'curators.json' },
  curations:            { gid: '1053784494',            outputFile: 'curations.json' },
  educationHistory:     { gid: '487311061',    outputFile: 'educationHistory.json' },
  heroContents:         { gid: '1304975179',        outputFile: 'heroContents.json' },
  artNews:              { gid: '2041682140',                    outputFile: 'art-news.json' },
  featuredArtistIds:    { gid: '1008375315',     outputFile: 'featured-artist-ids.json' },
  exhibitions:          { gid: '0',                             outputFile: 'exhibitions.json' },
  featuredExhibitionIds:{ gid: '446645403',                     outputFile: 'featured-exhibition-ids.json' },
  artistInExhibition:   { gid: '486094120',                     outputFile: 'artistInExhibition.json' },
  artworkInExhibition:  { gid: '596902498',                     outputFile: 'artworkInExhibition.json' },
};

// Fix: Define `__dirname` for an ES modules environment.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 기존 '../data' → 앱이 바로 읽을 수 있도록 '../public/data'로 변경
const DATA_DIR = path.join(__dirname, '../public/data');

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

// 세로형 전용 헬퍼(중복 선언 금지)
type Row = Record<string, any>;
const toStr = (v: unknown) => (v == null ? '' : String(v).trim());
const normalizeKeys = (row: any): Row => {
  const out: Row = {};
  for (const [k, v] of Object.entries(row || {})) out[String(k).trim().toLowerCase()] = v;
  return out;
};
const pick = (row: Row, keys: string[]) => {
  for (const k of keys) {
    const v = row?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return undefined;
};
const normalizeExId = (v?: unknown): string | undefined => {
  const s = toStr(v);
  if (!s) return undefined;
  const m1 = s.match(/^ex-0*(\d+)$/i); if (m1) return `ex-${m1[1]}`;
  if (/^ex-\d+$/i.test(s)) return s.toLowerCase();
  const m2 = s.match(/^\d+$/); if (m2) return `ex-${m2[0]}`;
  return undefined;
};
const isArtistId = (s: string) => /^artist-\d+$/i.test(s);
const isArtworkId = (s: string) => /^(art|artwork)-\d+(?:-\d+)*$/i.test(s);
/** 헤더 오염/대소문자/공백 대응해서 실제 컬럼 키를 찾아냄 */
const resolveColumnKey = (row: Row, aliases: string[]): string | undefined => {
  const keys = Object.keys(row || {});
  const norm = (k: string) => k.replace(/\s+/g, '').toLowerCase();
  // exact
  for (const k of keys) if (aliases.includes(norm(k))) return k;
  // startsWith
  for (const k of keys) if (aliases.some(a => norm(k).startsWith(a))) return k;
  // contains
  for (const k of keys) if (aliases.some(a => norm(k).includes(a))) return k;
  return undefined;
};

// 추가: 누락된 헬퍼들(중복 선언 금지)
// 헬퍼(중복 선언 금지)
function extractIdFromSeedUrl(url?: string): string | undefined {
  const s = typeof url === 'string' ? url : '';
  const m = s.match(/\/seed\/([^/]+)\//i);
  return m ? m[1].trim() : undefined;
}

// 모든 시트를 병렬로 받아와 Map<시트키, 행배열> 형태로 반환
async function fetchData(): Promise<Map<string, Row[]>> {
  console.log('1. Google Sheet에서 모든 데이터를 가져옵니다...');
  const map = new Map<string, Row[]>();

  await Promise.all(
    Object.entries(SHEET_CONFIGS).map(async ([key, cfg]) => {
      try {
        const csv = await fetchSheet(cfg.gid);
        const rows = parseCsv(csv);
        map.set(key, rows as Row[]);
      } catch (e) {
        console.error(`  - ⚠️ ${key} 시트를 가져오는데 실패했습니다.`, e);
        map.set(key, []);
      }
    })
  );

  return map;
}

// --- 메인 실행 로직 ---
async function main() {
  console.log('🚀 Google Sheet 데이터 동기화를 시작합니다...');
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const rawDataMap = await fetchData();

    // 기본 시트
    const rawExhibitions: Row[] = rawDataMap.get('exhibitions') || [];

    // 관계 시트(세로형)
    const aieRows = ((rawDataMap.get('artistInExhibition') || []) as any[]).map(normalizeKeys);
    const aweRows = ((rawDataMap.get('artworkInExhibition') || []) as any[]).map(normalizeKeys);

    console.log(`[map] AIE rows=${aieRows.length}`, aieRows[0] ? `keys: ${Object.keys(aieRows[0]).join(' | ')}` : '(empty)');
    console.log(`[map] AWE rows=${aweRows.length}`, aweRows[0] ? `keys: ${Object.keys(aweRows[0]).join(' | ')}` : '(empty)');

    // 컬럼 키 자동 판별
    const aieExKey = aieRows[0] ? resolveColumnKey(aieRows[0], ['exhibitionid','전시회아이디','ex_id','전시아이디','전시회']) : undefined;
    const aieArtistKey = aieRows[0] ? resolveColumnKey(aieRows[0], ['artistid','전시작가명아이디','작가아이디','ar_id','작가']) : undefined;
    const aweExKey = aweRows[0] ? resolveColumnKey(aweRows[0], ['exhibitionid','전시회아이디','ex_id','전시아이디','전시회']) : undefined;
    const aweArtworkKey = aweRows[0] ? resolveColumnKey(aweRows[0], ['artworkid','전시작품아이디','작품아이디','aw_id','작품']) : undefined;

    console.log(`[map] resolved keys -> AIE(exhibitionId:${aieExKey}, artistId:${aieArtistKey}), AWE(exhibitionId:${aweExKey}, artworkId:${aweArtworkKey})`);

    // 전시 → 작가IDs
    const exhibitionArtistsMap = new Map<string, string[]>();
    let aieOk = 0, aieMiss = 0;
    if (aieRows.length && aieExKey && aieArtistKey) {
      for (const r of aieRows) {
        const exId = normalizeExId(r[aieExKey]);
        const artistId = toStr(r[aieArtistKey]);
        if (!exId || !artistId || !isArtistId(artistId)) { aieMiss++; continue; }
        if (!exhibitionArtistsMap.has(exId)) exhibitionArtistsMap.set(exId, []);
        exhibitionArtistsMap.get(exId)!.push(artistId);
        aieOk++;
      }
      for (const [k, v] of exhibitionArtistsMap) exhibitionArtistsMap.set(k, Array.from(new Set(v)));
    }
    console.log(`[map] AIE ok=${aieOk}, miss=${aieMiss}, ex-1 artists=${(exhibitionArtistsMap.get('ex-1')||[]).length}`);

    // 전시 ↔ 작품IDs
    const exhibitionArtworksMap = new Map<string, string[]>();  // exId -> [artworkId]
    const artworkExhibitionMap = new Map<string, string[]>();   // artworkId -> [exId]
    let aweOk = 0, aweMiss = 0;
    if (aweRows.length && aweExKey && aweArtworkKey) {
      for (const r of aweRows) {
        const exId = normalizeExId(r[aweExKey]);
        const awId = toStr(r[aweArtworkKey]);
        if (!exId || !awId /* || !isArtworkId(awId) */) { aweMiss++; continue; } // 최소 검증
        if (!exhibitionArtworksMap.has(exId)) exhibitionArtworksMap.set(exId, []);
        exhibitionArtworksMap.get(exId)!.push(awId);
        if (!artworkExhibitionMap.has(awId)) artworkExhibitionMap.set(awId, []);
        artworkExhibitionMap.get(awId)!.push(exId);
        aweOk++;
      }
      for (const [k, v] of exhibitionArtworksMap) exhibitionArtworksMap.set(k, Array.from(new Set(v)));
      for (const [k, v] of artworkExhibitionMap) artworkExhibitionMap.set(k, Array.from(new Set(v)));
    }
    console.log(`[map] AWE ok=${aweOk}, miss=${aweMiss}`);
    console.log(`[map] ex-1 artworks=${(exhibitionArtworksMap.get('ex-1')||[]).length}, sample: ${(exhibitionArtworksMap.get('ex-1')||[]).slice(0,5).join(', ')}`);

    // 확인용 관계 파일 저장
    await fs.writeFile(
      path.join(DATA_DIR, 'artistInExhibition.json'),
      JSON.stringify(Array.from(exhibitionArtistsMap.entries()).map(([exhibitionId, artistIds]) => ({ exhibitionId, artistIds })), null, 2)
    );
    await fs.writeFile(
      path.join(DATA_DIR, 'artworkInExhibition.json'),
      JSON.stringify(Array.from(artworkExhibitionMap.entries()).map(([artworkId, exhibitionIds]) => ({ artworkId, exhibitionIds })), null, 2)
    );

    // 최종 JSON 생성(주입)
    const finalJsonData: { [key: string]: any[] } = {};

    finalJsonData.artists = (rawDataMap.get('artists') || []).map(r => ({
      id: r['id'],
      name: r['name'],
      bio: r['bio'],
      profileImage: r['profileImage'],
    }));

    finalJsonData.artworks = (rawDataMap.get('artworks') || []).map((r: Row) => {
      const id = pick(normalizeKeys(r), ['id','작품아이디','artworkid']);
      return {
        id,
        title: r['title'] ?? r['작품명'],
        artistId: r['artistId'] ?? r['작가아이디'],
        artistName: r['artistName'],
        year: Number(r['year'] ?? r['년도']) || 0,
        medium: r['medium'] ?? r['재료'],
        imageUrl: r['imageUrl'] ?? r['이미지'],
        description: r['description'] ?? r['설명'],
        exhibitionIds: id ? (artworkExhibitionMap.get(id) || []) : [],
      };
    });

    finalJsonData.exhibitions = rawExhibitions.map((r: Row) => {
      const rr = normalizeKeys(r);
      const id = normalizeExId(pick(rr, ['전시회아이디','exhibitionid','id'])) || '';
      const period = toStr(pick(rr, ['전시기간','period']) || '');
      const [startDate, endDate] = period ? period.split('~').map(d => d.trim()) : ['미정', '미정'];
      return {
        id,
        title: r['전시회'] ?? r['title'],
        description: r['전시요약'] ?? r['description'],
        startDate,
        endDate,
        thumbnailImage: (r['이미지위치정보'] ?? r['thumbnailImage']) || `https://picsum.photos/seed/${id}/600/400`,
        artistIds: id ? (exhibitionArtistsMap.get(id) || []) : [],
        artworkIds: id ? (exhibitionArtworksMap.get(id) || []) : [],
      };
    });

    finalJsonData.curators = (rawDataMap.get('curators') || []).map(r => ({
      id: r['id'],
      name: r['name'],
      title: r['title'],
      bio: r['bio'],
      profileImage: r['profileImage'],
    }));

    finalJsonData.curations = (rawDataMap.get('curations') || []).map(r => ({
      id: r['id'],
      title: r['title'],
      authorId: r['authorId'],
      excerpt: r['excerpt'],
      artistIds: (r['artistIds'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      artworkIds: (r['artworkIds'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      exhibitionIds: (r['exhibitionIds'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      videoUrl: r['videoUrl'] || undefined,
      bShowCase: (r['bShowCase'] || '').toUpperCase() === 'TRUE',
    }));

    finalJsonData.educationHistory = (rawDataMap.get('educationHistory') || []).map(r => ({
      year: r['year'],
      programName: r['programName'],
      description: r['description'],
      outcome: r['outcome'],
      level: r['level'] || undefined,
    }));

    finalJsonData.heroContents = (rawDataMap.get('heroContents') || []).map(r => ({
      title: r['title'],
      subtitle: r['subtitle'],
      imageUrl: r['imageUrl'],
      button1_text: r['button1_text'],
      button1_link: r['button1_link'],
      button2_text: r['button2_text'],
      button2_link: r['button2_link'],
    }));

    finalJsonData.artNews = (rawDataMap.get('artNews') || []).map(r => ({
      id: r['id'],
      category: r['category'],
      title: r['title'],
      source: r['source'],
      date: r['date'],
      content: r['content'],
      imageUrl: r['imageUrl'],
    }));

    finalJsonData.featuredArtistIds = (rawDataMap.get('featuredArtistIds') || []).map((r: Row) => r['id']);
    finalJsonData.featuredExhibitionIds = (rawDataMap.get('featuredExhibitionIds') || []).map((r: Row) => r['exhibitionId']);

    // 5) 파일 저장
    console.log('3. 가공된 데이터를 JSON 파일로 저장합니다...');
    for (const [key, data] of Object.entries(finalJsonData)) {
      const configKey = key.endsWith('Ids') ? key.replace('Ids', '') + 'Ids' : key;
      const config = SHEET_CONFIGS[configKey as keyof typeof SHEET_CONFIGS];
      if (config && config.outputFile) {
        const filePath = path.join(DATA_DIR, config.outputFile);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`  - ✅ ${config.outputFile} 파일이 성공적으로 저장되었습니다.`);
      }
    }

    console.log('\n🎉 모든 데이터 동기화가 성공적으로 완료되었습니다!');
  } catch (error) {
    console.error('\n❌ 데이터 동기화 중 심각한 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('\n❌ 데이터 동기화 중 심각한 오류가 발생했습니다:', e);
  process.exit(1);
});