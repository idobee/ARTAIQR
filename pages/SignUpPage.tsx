import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button.tsx';
import GoogleIcon from '../components/icons/GoogleIcon.tsx';
import FacebookIcon from '../components/icons/FacebookIcon.tsx';
import AppleIcon from '../components/icons/AppleIcon.tsx';
import { useAuth } from '../context/AuthContext.tsx';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { signUp } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    // data와 error를 모두 받도록 수정합니다.
    const { data, error: signUpError } = await signUp(name, email, password);
    setLoading(false);

    // 응답 데이터를 콘솔에 출력하여 확인합니다.
    console.log('Supabase 응답 데이터:', data);
    console.log('Supabase 응답 에러:', signUpError);

    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        setError('이미 가입된 이메일입니다. 로그인해주세요.');
      } else if (signUpError.message.includes('Password should be at least 6 characters')) {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else {
        setError('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      setSuccessMessage('회원가입 확인 메일이 발송되었습니다. 이메일을 확인하여 계정을 활성화해주세요.');
    }
  };

  if (successMessage) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
            <div className="w-full max-w-md p-8 space-y-8 bg-brand-gray rounded-lg shadow-lg text-center">
                 <h1 className="text-3xl font-serif font-bold text-brand-gold">감사합니다!</h1>
                 <p className="text-gray-300">{successMessage}</p>
                 <Link to="/login"><Button>로그인 페이지로</Button></Link>
            </div>
        </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-brand-gray rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-brand-light">회원가입</h1>
          <p className="mt-2 text-gray-400">새로운 계정을 생성하세요.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              이름
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark border border-brand-dark rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                placeholder="홍길동"
              />
            </div>
          </div>
          
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark border border-brand-dark rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                placeholder="••••••••"
              />
            </div>
          </div>

           <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
              비밀번호 확인
            </label>
            <div className="mt-1">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark border border-brand-dark rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div>
            <Button type="submit" className="w-full justify-center" disabled={loading}>
              {loading ? '생성 중...' : '계정 생성하기'}
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
              aria-label="Google로 가입"
            >
              <GoogleIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-3 bg-brand-dark rounded-full hover:bg-opacity-80 transition-colors text-white"
              aria-label="Facebook으로 가입"
            >
              <FacebookIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-3 bg-brand-dark rounded-full hover:bg-opacity-80 transition-colors text-white"
              aria-label="Apple로 가입"
            >
              <AppleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <p className="mt-10 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium text-brand-gold hover:text-opacity-80">
            로그인
            </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;