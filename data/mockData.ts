import type { Artist, Artwork, Curation, Exhibition, HeroContent, Curator, EducationHistory, ArtNews } from '../types';
import { ArtNewsCategory } from '../types';

const artists: Artist[] = [
    { id: 'artist-1', name: '이수민', bio: '빛과 그림자를 통해 도시의 고독을 탐구하는 현대 사진 작가.', profileImage: 'https://picsum.photos/seed/artist-1/400/400' },
    { id: 'artist-2', name: '김도윤', bio: '전통 수묵화 기법을 현대적으로 재해석하여 자연의 생명력을 표현.', profileImage: 'https://picsum.photos/seed/artist-2/400/400' },
    { id: 'artist-3', name: '박서아', bio: '버려진 오브제를 활용한 설치 미술로 소비 사회를 비판.', profileImage: 'https://picsum.photos/seed/artist-3/400/400' },
    { id: 'artist-4', name: '최준서', bio: '강렬한 색채와 역동적인 붓터치로 내면의 풍경을 그리는 추상화가.', profileImage: 'https://picsum.photos/seed/artist-4/400/400' },
    { id: 'artist-5', name: '정하윤', bio: '인간과 기술의 관계를 탐구하는 미디어 아티스트.', profileImage: 'https://picsum.photos/seed/artist-5/400/400' },
    { id: 'artist-6', name: '강지호', bio: '극사실주의 기법으로 현대인의 초상을 담아내는 화가.', profileImage: 'https://picsum.photos/seed/artist-6/400/400' },
    { id: 'artist-7', name: '윤채원', bio: '섬유와 실을 이용하여 따뜻한 공동체의 기억을 재구성하는 텍스타일 아티스트.', profileImage: 'https://picsum.photos/seed/artist-7/400/400' },
    { id: 'artist-8', name: '임현우', bio: '자연의 소리를 시각화하는 사운드 설치 작업을 진행.', profileImage: 'https://picsum.photos/seed/artist-8/400/400' },
    { id: 'artist-9', name: '송지아', bio: '점, 선, 면 등 기본적인 조형 요소를 통해 질서와 혼돈을 표현.', profileImage: 'https://picsum.photos/seed/artist-9/400/400' },
    { id: 'artist-10', name: '한유준', bio: '꿈과 무의식의 세계를 초현실주의 화풍으로 그려냄.', profileImage: 'https://picsum.photos/seed/artist-10/400/400' },
    { id: 'artist-11', name: '신은서', bio: '한국 전통 민화의 상징을 현대적 감각으로 재해석.', profileImage: 'https://picsum.photos/seed/artist-11/400/400' },
    { id: 'artist-12', name: '오건우', bio: '대리석과 금속을 사용하여 인간의 신화와 역사를 조각.', profileImage: 'https://picsum.photos/seed/artist-12/400/400' },
    { id: 'artist-13', name: '안소율', bio: '도시의 건축물들을 기하학적인 형태로 재구성하여 표현.', profileImage: 'https://picsum.photos/seed/artist-13/400/400' },
    { id: 'artist-14', name: '황시우', bio: '관객 참여를 통해 완성되는 인터랙티브 설치 미술을 선보임.', profileImage: 'https://picsum.photos/seed/artist-14/400/400' },
    { id: 'artist-15', name: '문지민', bio: '인간 관계의 복잡미묘함을 섬세한 인물 드로잉으로 포착.', profileImage: 'https://picsum.photos/seed/artist-15/400/400' },
    { id: 'artist-16', name: '고태양', bio: '자연 분해되는 재료만을 사용하여 환경과 생태에 대한 메시지를 전달.', profileImage: 'https://picsum.photos/seed/artist-16/400/400' },
    { id: 'artist-17', name: '백하린', bio: '디지털 콜라주 기법으로 현대 사회의 단편적인 이미지들을 조합.', profileImage: 'https://picsum.photos/seed/artist-17/400/400' },
    { id: 'artist-18', name: '서도현', bio: '시간의 흐름과 기억의 풍화를 주제로 작업하는 유화 작가.', profileImage: 'https://picsum.photos/seed/artist-18/400/400' },
    { id: 'artist-19', name: '나예은', bio: '사적인 경험을 바탕으로 한 영상과 텍스트를 결합한 비디오 아티스트.', profileImage: 'https://picsum.photos/seed/artist-19/400/400' },
    { id: 'artist-20', name: '유민준', bio: '사라져가는 것들에 대한 애정을 담아 따뜻한 색감의 풍경화를 그림.', profileImage: 'https://picsum.photos/seed/artist-20/400/400' }
];

const exhibitions: Exhibition[] = [
    { id: 'ex-1', title: '도시의 속삭임: 이수민 사진전', description: '빛과 그림자를 통해 현대 도시의 서정성을 탐구하는 이수민 작가의 개인전.', startDate: '2024.03.15', endDate: '2024.05.10', thumbnailImage: 'https://picsum.photos/seed/ex-1/600/400', artistIds: ['artist-1'] },
    { id: 'ex-2', title: '먹의 재발견: 김도윤, 송지아 2인전', description: '전통 수묵의 정신을 현대적으로 계승하는 두 작가의 만남.', startDate: '2024.04.01', endDate: '2024.06.20', thumbnailImage: 'https://picsum.photos/seed/ex-2/600/400', artistIds: ['artist-2', 'artist-9'] },
    { id: 'ex-3', title: '물질의 변용', description: '박서아, 윤채원, 오건우 작가가 참여하여 다양한 재료의 예술적 가능성을 모색하는 그룹전.', startDate: '2024.05.20', endDate: '2024.08.15', thumbnailImage: 'https://picsum.photos/seed/ex-3/600/400', artistIds: ['artist-3', 'artist-7', 'artist-12'] },
    { id: 'ex-4', title: '색채의 향연: 최준서 개인전', description: '최준서 작가의 강렬하고 역동적인 추상 회화 신작들을 선보입니다.', startDate: '2024.06.10', endDate: '2024.09.05', thumbnailImage: 'https://picsum.photos/seed/ex-4/600/400', artistIds: ['artist-4'] },
    { id: 'ex-5', title: '경계의 저편', description: '정하윤, 임현우, 황시우 작가가 참여하여 기술과 예술의 융합을 탐구하는 미디어 아트 특별전.', startDate: '2024.07.01', endDate: '2024.09.30', thumbnailImage: 'https://picsum.photos/seed/ex-5/600/400', artistIds: ['artist-5', 'artist-8', 'artist-14'] },
    { id: 'ex-6', title: '오늘의 얼굴: 강지호 초상화전', description: '극사실주의 기법으로 동시대를 살아가는 우리들의 모습을 담아낸 전시.', startDate: '2024.08.05', endDate: '2024.10.20', thumbnailImage: 'https://picsum.photos/seed/ex-6/600/400', artistIds: ['artist-6'] },
    { id: 'ex-7', title: '꿈의 해석: 한유준 개인전', description: '초현실주의 화가 한유준이 그려내는 신비롭고 환상적인 무의식의 세계.', startDate: '2024.09.01', endDate: '2024.11.30', thumbnailImage: 'https://picsum.photos/seed/ex-7/600/400', artistIds: ['artist-10'] },
    { id: 'ex-8', title: '구축된 풍경', description: '안소율, 서도현, 유민준 작가가 각자의 시선으로 재구성한 현대의 풍경.', startDate: '2024.10.15', endDate: '2025.01.10', thumbnailImage: 'https://picsum.photos/seed/ex-8/600/400', artistIds: ['artist-13', 'artist-18', 'artist-20'] },
    { id: 'ex-9', title: '보이지 않는 관계들', description: '문지민, 나예은 작가가 참여하여 인간 관계의 다층적인 모습을 섬세하게 조명하는 2인전.', startDate: '2024.11.20', endDate: '2025.02.15', thumbnailImage: 'https://picsum.photos/seed/ex-9/600/400', artistIds: ['artist-15', 'artist-19'] },
    { id: 'ex-10', title: '생태 감각: 예술로 환경을 말하다', description: '고태양, 백하린 작가가 참여하여 동시대 환경 문제에 대한 예술적 화두를 던지는 기획전.', startDate: '2024.12.01', endDate: '2025.03.20', thumbnailImage: 'https://picsum.photos/seed/ex-10/600/400', artistIds: ['artist-16', 'artist-17'] },
    { id: 'ex-11', title: '젊은 시선 2024', description: '주목받는 신진 작가 5인을 조명하는 연례 기획전.', startDate: '2024.03.01', endDate: '2024.04.30', thumbnailImage: 'https://picsum.photos/seed/ex-11/600/400', artistIds: ['artist-1', 'artist-4', 'artist-5', 'artist-11', 'artist-15'] },
    { id: 'ex-12', title: '드로잉의 모든 것', description: '선이라는 가장 기본적인 조형 언어의 무한한 가능성을 탐구하는 그룹전.', startDate: '2024.04.10', endDate: '2024.06.30', thumbnailImage: 'https://picsum.photos/seed/ex-12/600/400', artistIds: ['artist-2', 'artist-9', 'artist-15'] },
    { id: 'ex-13', title: '시간의 조각들: 서도현 개인전', description: '기억과 풍화의 흔적을 캔버스에 담아내는 서도현 작가의 회고전.', startDate: '2024.05.15', endDate: '2024.07.31', thumbnailImage: 'https://picsum.photos/seed/ex-13/600/400', artistIds: ['artist-18'] },
    { id: 'ex-14', title: '가상의 정원', description: '디지털 기술로 구현된 새로운 자연의 모습을 선보이는 미디어 아트전.', startDate: '2024.06.25', endDate: '2024.09.15', thumbnailImage: 'https://picsum.photos/seed/ex-14/600/400', artistIds: ['artist-5', 'artist-8', 'artist-17'] },
    { id: 'ex-15', title: '한국의 추상: 정신을 그리다', description: '한국 추상미술 1세대부터 현재까지의 흐름을 조망하는 특별 기획전.', startDate: '2024.07.20', endDate: '2024.10.31', thumbnailImage: 'https://picsum.photos/seed/ex-15/600/400', artistIds: ['artist-2', 'artist-4', 'artist-9'] },
    { id: 'ex-16', title: '이야기꾼들: 신은서, 나예은 2인전', description: '전통과 현대를 오가며 자신만의 서사를 만들어가는 두 여성 작가의 이야기.', startDate: '2024.08.10', endDate: '2024.11.10', thumbnailImage: 'https://picsum.photos/seed/ex-16/600/400', artistIds: ['artist-11', 'artist-19'] },
    { id: 'ex-17', title: '조각의 현재', description: '동시대 한국 조각의 다양한 양상과 미래를 조망하는 그룹전.', startDate: '2024.09.20', endDate: '2024.12.20', thumbnailImage: 'https://picsum.photos/seed/ex-17/600/400', artistIds: ['artist-3', 'artist-12', 'artist-16'] },
    { id: 'ex-18', title: '사이의 공간', description: '설치 미술을 통해 우리가 무심코 지나치는 공간의 의미를 되새겨보는 전시.', startDate: '2024.10.05', endDate: '2025.01.05', thumbnailImage: 'https://picsum.photos/seed/ex-18/600/400', artistIds: ['artist-3', 'artist-8', 'artist-14'] },
    { id: 'ex-19', title: '판화의 힘: 목판에서 디지털까지', description: '전통 목판화부터 현대 디지털 판화까지, 판화 매체의 변천사를 한눈에 볼 수 있는 전시.', startDate: '2024.11.15', endDate: '2025.02.28', thumbnailImage: 'https://picsum.photos/seed/ex-19/600/400', artistIds: ['artist-2', 'artist-17'] },
    { id: 'ex-20', title: '자화상: 나를 만나다', description: '다양한 작가들이 각자의 방식으로 표현한 자화상을 통해 \'나\'라는 존재를 성찰하는 기획전.', startDate: '2024.12.10', endDate: '2025.03.31', thumbnailImage: 'https://picsum.photos/seed/ex-20/600/400', artistIds: ['artist-1', 'artist-6', 'artist-10', 'artist-15', 'artist-18'] }
];

const artworks: Artwork[] = [
    { id: 'art-001', title: '어디서 무엇이 되어 다시 만나랴', artistId: 'artist-1', artistName: '이수민', year: 1970, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-001/800/600', description: '수많은 점들이 모여 우주를 이루는 작품.', exhibitionIds: [] },
    { id: 'art-002', title: '우주 05-IV-71 #200', artistId: 'artist-1', artistName: '이수민', year: 1971, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-002/800/600', description: '푸른 점화의 절정을 보여주는 작품으로, 무한한 공간감을 선사한다.', exhibitionIds: [] },
    { id: 'art-003', title: '흰 소', artistId: 'artist-2', artistName: '김도윤', year: 1954, medium: '종이에 유채', imageUrl: 'https://picsum.photos/seed/art-003/800/600', description: '민족의 기상을 상징하는 역동적인 소의 모습. 거친 붓터치가 인상적이다.', exhibitionIds: [] },
    { id: 'art-004', title: '황소', artistId: 'artist-2', artistName: '김도윤', year: 1953, medium: '종이에 유채', imageUrl: 'https://picsum.photos/seed/art-004/800/600', description: '강렬한 붉은색 배경과 힘찬 황소의 기운이 느껴지는 대표작.', exhibitionIds: [] },
    { id: 'art-005', title: '빨래터', artistId: 'artist-3', artistName: '박서아', year: 1950, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-005/800/600', description: '전쟁 속에서도 희망을 잃지 않는 서민들의 삶의 현장을 담았다.', exhibitionIds: [] },
    { id: 'art-006', title: '나무와 두 여인', artistId: 'artist-3', artistName: '박서아', year: 1962, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-006/800/600', description: '화강암 같은 질감으로 표현된 고목 아래 휴식을 취하는 여인들의 소박한 모습.', exhibitionIds: [] },
    { id: 'art-007', title: '다다익선', artistId: 'artist-4', artistName: '최준서', year: 1988, medium: '비디오 설치', imageUrl: 'https://picsum.photos/seed/art-007/800/600', description: '1003개의 TV 모니터로 이루어진 대표작. 개천절을 상징한다.', exhibitionIds: [] },
    { id: 'art-008', title: 'TV 부처', artistId: 'artist-4', artistName: '최준서', year: 1974, medium: '비디오 설치', imageUrl: 'https://picsum.photos/seed/art-008/800/600', description: '과거(부처)와 현재(TV)의 만남을 통한 명상적 질문을 던진다.', exhibitionIds: [] },
    { id: 'art-009', title: '미인도', artistId: 'artist-5', artistName: '정하윤', year: 1977, medium: '종이에 채색', imageUrl: 'https://picsum.photos/seed/art-009/800/600', description: '화려한 색채와 몽환적인 분위기가 특징인 대표작.', exhibitionIds: [] },
    { id: 'art-010', title: '생태', artistId: 'artist-5', artistName: '정하윤', year: 1951, medium: '종이에 채색', imageUrl: 'https://picsum.photos/seed/art-010/800/600', description: '35마리의 뱀을 통해 생명의 강인함을 표현한 파격적인 작품.', exhibitionIds: [] },
    { id: 'art-011', title: '가족도', artistId: 'artist-6', artistName: '강지호', year: 1972, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-011/800/600', description: '가족에 대한 사랑을 아이처럼 순수한 시선으로 단순하게 표현했다.', exhibitionIds: [] },
    { id: 'art-012', title: '까치', artistId: 'artist-6', artistName: '강지호', year: 1958, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-012/800/600', description: '동화적인 상상력으로 길조인 까치와 나무, 해를 조화롭게 배치했다.', exhibitionIds: [] },
    { id: 'art-013', title: '칼노래', artistId: 'artist-7', artistName: '윤채원', year: 1983, medium: '목판화', imageUrl: 'https://picsum.photos/seed/art-013/800/600', description: '역동적인 춤사위를 통해 민중의 한과 신명을 표현한 대표 목판화.', exhibitionIds: [] },
    { id: 'art-014', title: '대지', artistId: 'artist-7', artistName: '윤채원', year: 1984, medium: '목판화', imageUrl: 'https://picsum.photos/seed/art-014/800/600', description: '어머니와 아이의 모습을 통해 민중의 강인한 생명력을 상징한다.', exhibitionIds: [] },
    { id: 'art-015', title: 'Umber Blue', artistId: 'artist-8', artistName: '임현우', year: 1978, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-015/800/600', description: '청색과 다갈색의 번짐을 통해 깊은 공간감과 명상적인 분위기를 창출한다.', exhibitionIds: [] },
    { id: 'art-016', title: 'Burnt Umber & Ultramarine', artistId: 'artist-8', artistName: '임현우', year: 1995, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-016/800/600', description: '단순한 구성 속에 응축된 침묵과 성찰의 미학을 보여주는 단색화.', exhibitionIds: [] },
    { id: 'art-017', title: '무한을 향한 점', artistId: 'artist-9', artistName: '송지아', year: 1985, medium: '캔버스에 아크릴', imageUrl: 'https://picsum.photos/seed/art-017/800/600', description: '반복적인 점의 행위를 통해 수행과도 같은 예술의 과정을 보여준다.', exhibitionIds: [] },
    { id: 'art-018', title: '기억의 정원', artistId: 'artist-10', artistName: '한유준', year: 1992, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-018/800/600', description: '꿈과 무의식의 세계를 초현실주의 화풍으로 그려낸 신비로운 작품.', exhibitionIds: [] },
    { id: 'art-019', title: '21세기 책가도', artistId: 'artist-11', artistName: '신은서', year: 2018, medium: '종이에 채색', imageUrl: 'https://picsum.photos/seed/art-019/800/600', description: '전통 민화의 책가도 형식을 빌려 현대인의 지적 풍경을 위트있게 표현했다.', exhibitionIds: [] },
    { id: 'art-020', title: '이카루스의 날개', artistId: 'artist-12', artistName: '오건우', year: 2005, medium: '대리석, 브론즈', imageUrl: 'https://picsum.photos/seed/art-020/800/600', description: '그리스 신화를 현대적으로 재해석하여 인간의 욕망과 좌절을 조각했다.', exhibitionIds: [] },
    { id: 'art-021', title: '콘크리트 숲', artistId: 'artist-13', artistName: '안소율', year: 2015, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-021/800/600', description: '도시의 건축물들을 기하학적인 형태로 재구성하여 차가운 도시의 미학을 탐구한다.', exhibitionIds: [] },
    { id: 'art-022', title: '당신의 목소리', artistId: 'artist-14', artistName: '황시우', year: 2022, medium: '사운드 설치', imageUrl: 'https://picsum.photos/seed/art-022/800/600', description: '관객의 목소리를 실시간으로 시각화하여 상호작용의 경험을 제공하는 인터랙티브 아트.', exhibitionIds: [] },
    { id: 'art-023', title: '우리 사이의 거리', artistId: 'artist-15', artistName: '문지민', year: 2019, medium: '종이에 연필', imageUrl: 'https://picsum.photos/seed/art-023/800/600', description: '섬세한 인물 드로잉을 통해 현대 사회 속 인간 관계의 복잡미묘함을 포착한다.', exhibitionIds: [] },
    { id: 'art-024', title: '흙으로 돌아가다', artistId: 'artist-16', artistName: '고태양', year: 2021, medium: '혼합 매체 (흙, 씨앗)', imageUrl: 'https://picsum.photos/seed/art-024/800/600', description: '자연 분해되는 재료만을 사용하여 생명의 순환이라는 환경적 메시지를 전달한다.', exhibitionIds: [] },
    { id: 'art-025', title: '이미지 홍수', artistId: 'artist-17', artistName: '백하린', year: 2020, medium: '디지털 콜라주', imageUrl: 'https://picsum.photos/seed/art-025/800/600', description: '인터넷에 떠도는 수많은 이미지들을 조합하여 현대 사회의 시각적 과잉을 비판한다.', exhibitionIds: [] },
    { id: 'art-026', title: '오래된 일기', artistId: 'artist-18', artistName: '서도현', year: 2016, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-026/800/600', description: '시간의 흐름에 따라 빛 바래고 풍화된 기억의 단편들을 서정적으로 그려낸다.', exhibitionIds: [] },
    { id: 'art-027', title: '나의 방', artistId: 'artist-19', artistName: '나예은', year: 2017, medium: '단채널 비디오', imageUrl: 'https://picsum.photos/seed/art-027/800/600', description: '사적인 공간과 경험을 바탕으로 한 영상과 텍스트를 결합하여 개인의 서사를 풀어낸다.', exhibitionIds: [] },
    { id: 'art-028', title: '골목길', artistId: 'artist-20', artistName: '유민준', year: 2014, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-028/800/600', description: '사라져가는 도시의 풍경에 대한 애정을 담아 따뜻한 색감으로 재현했다.', exhibitionIds: [] },
    { id: 'art-029', title: '고요 속의 폭풍', artistId: 'artist-4', artistName: '최준서', year: 2008, medium: '캔버스에 아크릴', imageUrl: 'https://picsum.photos/seed/art-029/800/600', description: '내면에 휘몰아치는 감정을 강렬한 색채와 붓터치로 표현한 추상화.', exhibitionIds: [] },
    { id: 'art-030', title: '시간의 지층', artistId: 'artist-18', artistName: '서도현', year: 2020, medium: '캔버스에 유채', imageUrl: 'https://picsum.photos/seed/art-030/800/600', description: '겹겹이 쌓인 물감의 층을 통해 축적된 시간과 기억의 무게를 시각화한다.', exhibitionIds: [] }
];


const exhibitionArtworksMap: { [key: string]: string[] } = {
    'ex-1': ['art-001', 'art-002'],
    'ex-2': ['art-003', 'art-004', 'art-017'],
    'ex-3': ['art-005', 'art-006', 'art-013', 'art-014', 'art-020'],
    'ex-4': ['art-007', 'art-008', 'art-029'],
    'ex-5': ['art-009', 'art-010', 'art-015', 'art-016', 'art-022'],
    'ex-6': ['art-011', 'art-012'],
    'ex-7': ['art-018'],
    'ex-8': ['art-021', 'art-026', 'art-028', 'art-030'],
    'ex-9': ['art-023', 'art-027'],
    'ex-10': ['art-024', 'art-025'],
    'ex-11': ['art-001', 'art-007', 'art-009', 'art-019', 'art-023'],
    'ex-12': ['art-003', 'art-017', 'art-023'],
    'ex-13': ['art-026', 'art-030'],
    'ex-14': ['art-009', 'art-015', 'art-025'],
    'ex-15': ['art-003', 'art-007', 'art-017'],
    'ex-16': ['art-019', 'art-027'],
    'ex-17': ['art-005', 'art-020', 'art-024'],
    'ex-18': ['art-005', 'art-015', 'art-022'],
    'ex-19': ['art-003', 'art-025'],
    'ex-20': ['art-001', 'art-011', 'art-018', 'art-023', 'art-026']
};


artworks.forEach(art => {
    for (const exId in exhibitionArtworksMap) {
        if (exhibitionArtworksMap[exId].includes(art.id)) {
            if (!art.exhibitionIds) {
                art.exhibitionIds = [];
            }
            art.exhibitionIds.push(exId);
        }
    }
});

const curators: Curator[] = [
    { id: 'curator-1', name: '김민준', title: '수석 큐레이터', bio: '현대 미술과 기술의 융합을 탐구하며, 관객과 소통하는 전시에 대한 깊은 통찰력을 가지고 있습니다.', profileImage: 'https://picsum.photos/seed/curator-1/400/400' },
    { id: 'curator-2', name: '박서연', title: '디지털 미디어 큐레이터', bio: '미디어 아트와 인터랙티브 설치 미술을 전문으로 다루며, 기술이 예술적 표현을 어떻게 확장하는지에 대해 연구합니다.', profileImage: 'https://picsum.photos/seed/curator-2/400/400' },
    { id: 'curator-3', name: '이도현', title: '객원 큐레이터', bio: '한국 전통 미술을 현대적 시각으로 재해석하는 독립 큐레이터. 회화와 조각을 넘나드는 다양한 전시를 기획했습니다.', profileImage: 'https://picsum.photos/seed/curator-3/400/400' },
    { id: 'curator-4', name: 'AI 큐레이터', title: 'AI 큐레이터', bio: '방대한 미술사 데이터를 학습하여 작품 간의 숨겨진 연결고리를 발견하고 새로운 관점의 전시를 제안하는 인공지능입니다.', profileImage: 'https://picsum.photos/seed/curator-ai/400/400' }
];


export const curations: Curation[] = [
  { 
    id: 'cur-1', 
    title: '빛의 언어', 
    authorId: 'curator-4', 
    excerpt: '인상주의 화가들이 어떻게 빛의 찰나를 포착했는가에 대한 탐구. 모네, 르누아르 등의 작품을 통해 빛과 색의 혁명을 조명합니다.',
    artistIds: ['artist-18', 'artist-20'],
    artworkIds: ['art-026', 'art-028', 'art-030'],
    exhibitionIds: ['ex-8', 'ex-13'],
    videoUrl: 'https://www.youtube.com/watch?v=qmH-qg_9p7s',
    bShowCase: true,
  },
  { 
    id: 'cur-2', 
    title: '내면의 외침: 표현주의의 대가들', 
    authorId: 'curator-1', 
    excerpt: '뭉크와 쉴레의 작품을 중심으로, 20세기 초 예술가들이 겪었던 내면의 고통과 사회적 불안을 어떻게 예술로 승화시켰는지 살펴봅니다.',
    artistIds: ['artist-4', 'artist-6'],
    artworkIds: ['art-007', 'art-011', 'art-029'],
    exhibitionIds: ['ex-4', 'ex-6'],
    bShowCase: false,
  },
  { 
    id: 'cur-3', 
    title: '형태의 해체와 재구성', 
    authorId: 'curator-4', 
    excerpt: '피카소와 브라크가 이끈 입체주의의 여정. 단일 시점에서 벗어나 다각적인 시점으로 대상을 포착하려는 시도를 분석합니다.',
    artistIds: ['artist-13'],
    artworkIds: ['art-021'],
    exhibitionIds: ['ex-8'],
    bShowCase: true,
  },
  { 
    id: 'cur-4', 
    title: '고요의 미학: 단색화', 
    authorId: 'curator-2', 
    excerpt: '1970년대 한국을 대표하는 단색화의 정신과 철학. 비움과 채움을 통해 한국적 미니멀리즘의 정수를 보여줍니다.',
    artistIds: ['artist-2', 'artist-9'],
    artworkIds: ['art-003', 'art-017'],
    exhibitionIds: ['ex-2', 'ex-12', 'ex-15'],
    videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    bShowCase: false,
  },
];

export const heroContents: HeroContent[] = [
    { title: '예술과 지능의 만남', subtitle: '전시를 발견하고, 작가와 소통하며, AI 기반 큐레이션 도구로 여러분만의 이야기를 만들어보세요.', imageUrl: 'https://picsum.photos/seed/hero1/1600/900', button1_text: '전시 둘러보기', button1_link: '/exhibitions', button2_text: 'AI 큐레이터 되기', button2_link: '/education' },
    { title: '점, 선, 면: 우주를 그리다', subtitle: '한국 추상미술의 선구자, 김환기 화백의 뉴욕 시대 작품들을 만나보세요.', imageUrl: 'https://picsum.photos/seed/ex-1/1600/900', button1_text: '전시 상세 보기', button1_link: '/exhibitions', button2_text: '작가 정보', button2_link: '/artists' },
    { title: '미래를 큐레이팅하다', subtitle: 'AI 큐레이터 교육 프로그램에 참여하여 예술과 기술의 경계를 허무는 전문가로 거듭나세요.', imageUrl: 'https://picsum.photos/seed/edu/1600/900', button1_text: '더 알아보기', button1_link: '/education', button2_text: '지금 가입하기', button2_link: '/login' },
    { title: '황소의 숨결', subtitle: '민족의 기상을 담은 이중섭 화백의 강렬한 필치를 직접 느껴보세요.', imageUrl: 'https://picsum.photos/seed/ex-2/1600/900', button1_text: '전시 바로가기', button1_link: '/exhibitions', button2_text: 'AI 큐레이션 보기', button2_link: '/curation' }
];

const educationHistory: EducationHistory[] = [
  { year: '2023', programName: '제3기 AI 큐레이터 양성 과정', level: '심화 과정', description: '미술사 기초와 최신 AI 기술을 접목하여 큐레이션의 새로운 가능성을 탐구하는 12주 심화 과정.', outcome: '25명의 수료생 배출, 수료생 기획전 \'알고리즘의 시선\' 개최.'},
  { year: '2022', programName: '디지털 아트와 NFT 워크숍', level: '단기 워크숍', description: '블록체인 기술과 예술의 만남을 주제로 한 4주 단기 워크숍.', outcome: '50여명의 아티스트 및 컬렉터 참여, 참여자 대상 NFT 작품 발행 지원.'},
  { year: '2022', programName: '제2기 AI 큐레이터 양성 과정', level: '중급 과정', description: 'Gemini API를 활용한 텍스트 생성 및 이미지 분석 기술을 큐레이션 실무에 적용하는 방법을 학습.', outcome: '22명의 수료생 배출, 우수 프로젝트 3건 온라인 전시로 구현.'},
  { year: '2021', programName: '청소년을 위한 미디어 아트 캠프', level: '체험 과정', description: '여름방학 기간 동안 청소년들이 직접 코딩으로 예술 작품을 만들어보는 체험형 교육 프로그램.', outcome: '30명의 중고등학생 참여, 수료 작품 온라인 갤러리 전시.'},
  { year: '2021', programName: '제1기 AI 큐레이터 양성 과정', level: '입문 과정', description: '인공지능을 활용한 예술 큐레이션의 개념을 소개하고 기초적인 도구 사용법을 익히는 파일럿 프로그램.', outcome: '15명의 수료생 배출, 프로그램의 정규 과정 편성 기반 마련.'},
];

const artNews: ArtNews[] = [
    {
        id: 'news-1',
        category: ArtNewsCategory.DOMESTIC,
        title: '국립현대미술관, \'한국의 추상\' 대규모 기획전 개최',
        source: '연합뉴스',
        date: '2024-08-15',
        content: '국립현대미술관이 한국 추상미술 1세대부터 현재까지의 흐름을 조망하는 대규모 기획전 \'정신을 그리다\'를 개최한다. 이번 전시는 김환기, 이중섭 등 거장들의 작품을 한자리에서 만나볼 수 있는 기회다.',
        imageUrl: 'https://picsum.photos/seed/news-1/600/400'
    },
    {
        id: 'news-2',
        category: ArtNewsCategory.INTERNATIONAL,
        title: '파리 루브르 박물관, 디지털 아트 특별전 \'가상의 정원\' 개막',
        source: 'Artnet News',
        date: '2024-08-12',
        content: '세계적인 명성의 루브르 박물관이 디지털 기술로 구현된 새로운 자연의 모습을 선보이는 미디어 아트전 \'가상의 정원\'을 개막했다. 정하윤, 임현우 작가 등이 참여했다.',
        imageUrl: 'https://picsum.photos/seed/news-2/600/400'
    },
    {
        id: 'news-3',
        category: ArtNewsCategory.ONLINE,
        title: '\'사이의 공간\' 온라인 갤러리 오픈',
        source: '아트 AI 큐레이터',
        date: '2024-08-10',
        content: '코로나19 상황에 맞춰 \'사이의 공간\' 전시가 온라인 갤러리로도 오픈되었다. VR 기술을 통해 집에서도 생생하게 작품을 감상할 수 있다.',
        imageUrl: 'https://picsum.photos/seed/news-3/600/400'
    },
    {
        id: 'news-4',
        category: ArtNewsCategory.DOMESTIC,
        title: '신진 작가 발굴 프로젝트 \'젊은 시선 2024\' 성황리 폐막',
        source: '월간미술',
        date: '2024-07-30',
        content: '주목받는 신진 작가 5인을 조명하는 \'젊은 시선 2024\'가 한 달간의 전시를 마치고 성황리에 폐막했다. 이수민, 최준서 작가 등이 새로운 가능성을 보여주었다.',
        imageUrl: 'https://picsum.photos/seed/news-4/600/400'
    },
    {
        id: 'news-5',
        category: ArtNewsCategory.INTERNATIONAL,
        title: '베니스 비엔날레 한국관, \'생태 감각\' 주제로 호평',
        source: 'The Art Newspaper',
        date: '2024-07-25',
        content: '제60회 베니스 비엔날레 한국관이 \'생태 감각: 예술로 환경을 말하다\'를 주제로 현지 언론과 평단의 호평을 받고 있다. 고태양, 백하린 작가가 참여했다.',
        imageUrl: 'https://picsum.photos/seed/news-5/600/400'
    },
    {
        id: 'news-6',
        category: ArtNewsCategory.ONLINE,
        title: 'AI가 큐레이팅한 \'빛의 언어\' 온라인 전시, 1만 뷰 돌파',
        source: 'AI Times',
        date: '2024-08-18',
        content: '아트 AI 큐레이터가 기획한 \'빛의 언어\' 온라인 전시가 오픈 일주일 만에 1만 뷰를 돌파하며 기술과 예술의 성공적인 융합 사례로 주목받고 있다.',
        imageUrl: 'https://picsum.photos/seed/news-6/600/400'
    }
];


export const getMockData = () => {
    const featuredExhibitions = exhibitions.filter(e => ['ex-1', 'ex-2', 'ex-3', 'ex-4', 'ex-5', 'ex-7', 'ex-10', 'ex-11', 'ex-15', 'ex-20'].includes(e.id));
    const featuredArtists = artists.filter(a => ['artist-1', 'artist-2', 'artist-3', 'artist-4', 'artist-6', 'artist-10', 'artist-12', 'artist-18'].includes(a.id));
    return { artists, exhibitions, artworks, curations, featuredExhibitions, featuredArtists, heroContents, curators, educationHistory, artNews };
};