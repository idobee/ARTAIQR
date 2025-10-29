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
const OUT = path.join(__dirname, '../public/data');

const ARR = [
  'artists.json','artworks.json','curators.json','curations.json','exhibitions.json',
  'heroContents.json','art-news.json','educationHistory.json',
  'featured-artist-ids.json','featured-exhibition-ids.json'
];

async function writeIfMissing(file: string, content: string) {
  try { await fs.access(file); console.log(`skip (exists): ${path.basename(file)}`); }
  catch { await fs.writeFile(file, content, 'utf-8'); console.log(`create: ${path.basename(file)}`); }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await Promise.all(ARR.map(f => writeIfMissing(path.join(OUT, f), '[]')));
  await writeIfMissing(path.join(OUT, 'educationCurriculum.json'), '{}');
  console.log('✅ placeholders (no overwrite) -> public/data');
}
main().catch(e => (console.error(e), process.exit(1)));