import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { submitApplication } from '../../services/applicationService.ts';
import Button from './Button.tsx';
import Input from './Input.tsx';
import CloseIcon from '../icons/CloseIcon.tsx';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: string;
  programTitle: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, programId, programTitle }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // 휴대폰 번호 상태 추가
  const [profile, setProfile] = useState('');
  const [motivation, setMotivation] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      setMotivation('');
      setProfile('');
      setPhone(''); // 모달이 열릴 때 휴대폰 번호 초기화
      if (user) {
        setName(user.user_metadata.full_name || '');
      }
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage('신청을 위해 로그인이 필요합니다.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');

    try {
      // submitApplication 호출 시 userId를 전달합니다.
      await submitApplication({
        userId: user.id, // user.id를 userId로 전달
        name,
        email: user.email!,
        phone,
        profile,
        motivation,
        programId,
      });
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || '신청 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-lg shadow-2xl max-w-lg w-full relative p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-light hover:text-brand-gold transition-colors z-10">
          <CloseIcon />
        </button>

        <h2 className="text-3xl font-serif font-bold text-brand-gold mb-2 text-center">교육 프로그램 지원</h2>
        <p className="text-center text-brand-light-2 mb-6">{programTitle}</p>
        
        {status === 'success' ? (
          <div className="text-center">
            <p className="text-lg text-green-400 mb-4">지원이 성공적으로 완료되었습니다.</p>
            <p className="text-brand-light-2">검토 후 결과를 알려드리겠습니다.</p>
            <Button onClick={onClose} className="mt-6">
              닫기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="이름" type="text" value={name} disabled />
            <Input label="이메일" type="email" value={user?.email || ''} disabled />
            
            {/* 휴대폰 번호 입력란 추가 */}
            <Input 
              label="휴대폰 번호"
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
            />

            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-brand-light-2 mb-1">주요 경력 및 자기소개</label>
              <textarea
                id="profile"
                rows={3}
                required
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="w-full bg-brand-dark border border-brand-light-2 text-brand-light rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold"
                placeholder="자신의 이력과 강점에 대해 간략히 소개해주세요."
              />
            </div>
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-brand-light-2 mb-1">지원 동기</label>
              <textarea
                id="motivation"
                rows={5}
                required
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full bg-brand-dark border border-brand-light-2 text-brand-light rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold"
                placeholder="AI 큐레이터 과정에 지원하게 된 동기와 이 프로그램을 통해 이루고 싶은 목표에 대해 작성해주세요."
              />
            </div>

            {status === 'error' && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

            <div>
              <Button type="submit" disabled={status === 'submitting'} className="w-full">
                {status === 'submitting' ? '제출 중...' : '지원서 제출'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;