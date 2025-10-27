import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import GoogleIcon from '../components/icons/GoogleIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import AppleIcon from '../components/icons/AppleIcon';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await login(email, password);

    if (authError) {
      setError(authError.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 잘못되었습니다.' : authError.message);
    } else {
      navigate('/'); // onAuthStateChange will handle user state, then navigate to home
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-brand-gray rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-brand-light">로그인</h1>
          <p className="mt-2 text-gray-400">아트 AI 큐레이터에 오신 것을 환영합니다.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              이메일 주소
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark border border-brand-dark rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              비밀번호
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark border border-brand-dark rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-gold bg-brand-dark border-brand-gray rounded focus:ring-brand-gold"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                로그인 정보 저장
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-brand-gold hover:text-opacity-80">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full justify-center" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-dark" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-gray text-gray-400">또는</span>
          </div>
        </div>

        <div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="p-3 bg-brand-dark rounded-full hover:bg-opacity-80 transition-colors"
              aria-label="Google로 로그인"
            >
              <GoogleIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-3 bg-brand-dark rounded-full hover:bg-opacity-80 transition-colors text-white"
              aria-label="Facebook으로 로그인"
            >
              <FacebookIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-3 bg-brand-dark rounded-full hover:bg-opacity-80 transition-colors text-white"
              aria-label="Apple로 로그인"
            >
              <AppleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <p className="mt-10 text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium text-brand-gold hover:text-opacity-80">
            회원가입
            </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;