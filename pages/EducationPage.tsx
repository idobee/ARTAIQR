import React, { useState } from 'react';
import Button from '../components/common/Button.tsx';
import ApplicationModal from '../components/common/ApplicationModal.tsx';
import { useData } from '../context/DataContext.tsx';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import ErrorMessage from '../components/common/ErrorMessage.tsx';

type Tab = 'beginner' | 'intermediate' | 'advanced' | 'experience';

const EducationPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState({ id: '', title: '' });
  const [activeTab, setActiveTab] = useState<Tab>('beginner');
  
  // useData 훅에서 모든 데이터를 가져옵니다.
  const { educationHistory, educationCurriculum, loading, error } = useData();

  const handleApplyClick = (programId: string, programTitle: string) => {
    setSelectedProgram({ id: programId, title: programTitle });
    setIsModalOpen(true);
  };

  const renderTabContent = () => {
    if (!educationCurriculum) return null;
    const content = educationCurriculum[activeTab];
    return (
      <div className="bg-brand-dark p-6 rounded-lg mt-[-8px] pt-10">
        <h4 className="text-2xl font-bold text-brand-gold mb-3">{content.title}</h4>
        <p className="text-gray-300 mb-6">{content.description}</p>
        <ul className="space-y-4">
          {content.modules.map((item, index) => (
            <li key={index} className="p-4 border-l-4 border-brand-gold bg-black bg-opacity-20 rounded-r-md">
              <p className="font-semibold text-brand-light">{item.title}</p>
              <p className="text-gray-400 text-sm mt-1">{item.details}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        programId={selectedProgram.id}
        programTitle={selectedProgram.title}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-4">AI 큐레이터 교육</h1>
        <p className="text-center text-lg text-gray-400 mb-12">미술사와 인공지능 사이의 간극을 메우다.</p>

        <div className="bg-brand-gray p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-serif text-brand-gold mb-4">프로그램 개요</h2>
          <p className="text-gray-300">
            우리의 포괄적인 프로그램은 큐레이터 실무의 미래를 개척하고자 하는 예술 애호가, 학생, 전문가를 위해 설계되었습니다. AI 도구를 활용하여 예술을 분석하고, 통찰력 있는 내러티브를 생성하며, 획기적인 전시를 만드는 방법을 배우십시오. 수료 시 인증서를 받고 고급 AI 큐레이터 도구에 대한 독점적인 액세스 권한을 얻게 됩니다.
          </p>
        </div>

        {/* --- 커리큘럼 탭 섹션 --- */}
        <div className="mb-12">
          <h3 className="text-2xl font-serif font-semibold mb-4 text-center">커리큘럼</h3>
          {loading ? <LoadingSpinner /> :
           error ? <ErrorMessage message={error} /> :
           educationCurriculum && (
            <>
              <div className="flex space-x-2 p-1 bg-black bg-opacity-20 rounded-lg z-10 relative">
                {(Object.keys(educationCurriculum) as Tab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as Tab)}
                    className={`flex-1 py-2.5 px-4 text-center font-semibold transition-all duration-300 rounded-md ${
                      activeTab === tab
                        ? 'bg-brand-gold text-brand-dark shadow-lg'
                        : 'bg-transparent text-gray-400 hover:bg-brand-dark hover:text-brand-light'
                    }`}
                  >
                    {educationCurriculum[tab].category}
                  </button>
                ))}
              </div>
              {renderTabContent()}
            </>
          )}
        </div>

        <div className="text-center mt-12 mb-16">
          <h3 className="text-2xl font-serif mb-4">다음 기수 시작: 2024년 10월 1일</h3>
          <Button onClick={() => handleApplyClick('main_program_2410', 'AI 큐레이터 정규 과정')}>지금 지원하기</Button>
        </div>

        {/* Education History Section */}
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-center border-t border-brand-gray pt-12">교육 히스토리</h2>
            {loading ? <LoadingSpinner/> : (
                <div className="mt-8 space-y-8">
                    {educationHistory.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 bg-brand-gray rounded-lg">
                            <div className="flex-shrink-0 font-serif text-brand-gold text-2xl md:w-1/6 text-left md:text-center">
                                <span>{item.year}</span>
                                {item.level && (
                                    <span className="block text-sm text-gray-200 font-sans mt-2 bg-brand-dark px-3 py-1 rounded-full w-full">{item.level}</span>
                                )}
                            </div>
                            <div className="md:w-5/6">
                                <h4 className="font-semibold text-xl text-brand-light mb-2">{item.programName}</h4>
                                <p className="text-gray-400 mb-3">{item.description}</p>
                                <p className="text-sm text-gray-300"><span className="font-semibold">주요 성과:</span> {item.outcome}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </>
  );
};

export default EducationPage;