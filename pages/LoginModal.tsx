import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import CloseIcon from '../components/icons/CloseIcon.tsx';
import Button from '../components/common/Button.tsx';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: loginError } = await login(email, password);
      if (loginError) {
        setError(loginError.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      } else {
        onClose(); // 성공 시 모달 닫기
      }
    } catch (err) {
      setError('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-brand-gray rounded-lg shadow-2xl max-w-md w-full relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-light hover:text-brand-gold transition-colors z-10"
        >
          <CloseIcon />
        </button>

        <h2 className="text-3xl font-serif font-bold text-brand-gold mb-6 text-center">로그인</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-light-2 mb-1">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-brand-light-2 text-brand-light rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-light-2 mb-1">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-brand-light-2 text-brand-light rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-brand-light-2">
            계정이 없으신가요?{' '}
            <Link to="/signup" onClick={onClose} className="font-medium text-brand-gold hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;