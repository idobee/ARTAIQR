import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { generateCuration } from '../services/geminiService';
import type { Artwork } from '../types';
import { CurationAudience, CurationLength, CurationTone } from '../types';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SparklesIcon from '../components/icons/SparklesIcon';

const AICuratorToolPage: React.FC = () => {
  const { artworks, loading: dataLoading, error: dataError } = useData();
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [theme, setTheme] = useState('');
  const [audience, setAudience] = useState<CurationAudience>(CurationAudience.GENERAL);
  const [length, setLength] = useState<CurationLength>(CurationLength.MEDIUM);
  const [tone, setTone] = useState<CurationTone>(CurationTone.INFORMATIVE);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [curationResult, setCurationResult] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleArtworkToggle = (artwork: Artwork) => {
    setSelectedArtworks(prev =>
      prev.find(a => a.id === artwork.id)
        ? prev.filter(a => a.id !== artwork.id)
        : [...prev, artwork]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedArtworks.length === 0 || !theme) {
      setGenerationError("최소 1개 이상의 작품을 선택하고, 전시 테마를 입력해주세요.");
      return;
    }
    
    setIsGenerating(true);
    setGenerationError(null);
    setCurationResult('');

    try {
      const result = await generateCuration({
        artworks: selectedArtworks,
        theme,
        audience,
        length,
        tone,
      });
      setCurationResult(result);
    } catch (err: any) {
      setGenerationError(err.message || '큐레이션 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (dataLoading) return <LoadingSpinner />;
  if (dataError) return <ErrorMessage message={dataError} />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <SparklesIcon className="mx-auto text-brand-gold h-12 w-12 mb-4" />
        <h1 className="text-4xl font-serif font-bold">AI 큐레이터 도구</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          작품을 선택하고 전시의 방향을 설정하면, AI가 당신만의 전문적인 큐레이션 원고를 생성해줍니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Form & Controls */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-brand-gold border-b border-brand-dark pb-2 mb-4">1. 전시 테마 설정</h2>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="예: '도시의 고독과 현대인의 초상'"
                className="w-full bg-brand-dark border border-brand-dark rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold"
                required
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-serif text-brand-gold border-b border-brand-dark pb-2 mb-4">2. 작품 선택 ({selectedArtworks.length}개)</h2>
              <div className="max-h-80 overflow-y-auto space-y-2 p-2 bg-brand-dark rounded-md">
                {artworks.map(art => (
                  <label key={art.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-brand-dark/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedArtworks.some(a => a.id === art.id)}
                      onChange={() => handleArtworkToggle(art)}
                      className="h-5 w-5 rounded bg-brand-dark border-gray-500 text-brand-gold focus:ring-brand-gold"
                    />
                    <img src={art.imageUrl} alt={art.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-brand-light">{art.title}</p>
                        <p className="text-sm text-gray-400">{art.artistName}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-brand-gold border-b border-brand-dark pb-2 mb-4">3. 원고 상세 설정</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">타겟 관객</label>
                      <select value={audience} onChange={(e) => setAudience(e.target.value as CurationAudience)} className="w-full bg-brand-dark border border-brand-dark rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold">
                          {Object.values(CurationAudience).map(val => <option key={val} value={val}>{val}</option>)}
                      </select>
                  </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">원고 길이</label>
                      <select value={length} onChange={(e) => setLength(e.target.value as CurationLength)} className="w-full bg-brand-dark border border-brand-dark rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold">
                          {Object.values(CurationLength).map(val => <option key={val} value={val}>{val}</option>)}
                      </select>
                  </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">톤앤매너</label>
                      <select value={tone} onChange={(e) => setTone(e.target.value as CurationTone)} className="w-full bg-brand-dark border border-brand-dark rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold">
                          {Object.values(CurationTone).map(val => <option key={val} value={val}>{val}</option>)}
                      </select>
                  </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={isGenerating}>
                {isGenerating ? "생성 중..." : <> <SparklesIcon /> 큐레이션 생성하기 </>}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side: Result */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-serif text-brand-gold border-b border-brand-dark pb-2 mb-4">생성된 큐레이션 원고</h2>
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-brand-light min-h-[30rem] bg-brand-dark rounded-md p-4 overflow-y-auto">
            {isGenerating && <LoadingSpinner />}
            {generationError && <ErrorMessage message={generationError} />}
            {curationResult && <div dangerouslySetInnerHTML={{ __html: curationResult.replace(/\n/g, '<br />') }} />}
            {!isGenerating && !generationError && !curationResult && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>설정을 완료하고 '큐레이션 생성하기'를 눌러주세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICuratorToolPage;
