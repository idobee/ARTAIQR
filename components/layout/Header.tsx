import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import Button from '../common/Button.tsx';
import MenuIcon from '../icons/MenuIcon.tsx';
import CloseIcon from '../icons/CloseIcon.tsx';
import LoginModal from '../../pages/LoginModal.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: '전시', path: '/exhibitions' },
    { name: '작가', path: '/artists' },
    { name: '작품', path: '/artworks' },
    { name: '큐레이션', path: '/curation' },
    { name: '교육', path: '/education' },
    { name: '아트뉴스', path: '/art-news' },
  ];

  const navLinkClasses = (isActive: boolean) => {
    const baseClasses = "text-xl font-medium transition-colors hover:text-brand-gold";
    const activeClass = "text-brand-gold";
    const inactiveClass = "text-brand-light";
    return `${baseClasses} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <>
      <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-serif font-bold text-brand-gold">
                Art AI Curator
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => navLinkClasses(isActive)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative flex items-center">
                  {/* 이메일 부분을 Link로 감싸줍니다. */}
                  <Link to="/mypage" className="text-brand-light mr-4 hover:text-brand-gold transition-colors cursor-pointer">
                    {user.email}
                  </Link>
                  <Button onClick={logout} variant="outline">
                    로그아웃
                  </Button>
                </div>
              ) : (
                <button onClick={() => setIsLoginModalOpen(true)} className={navLinkClasses(false)}>
                  로그인
                </button>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-light hover:text-brand-gold focus:outline-none"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-brand-gray text-brand-gold' : 'text-brand-light hover:bg-brand-gray'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-brand-gray my-2"></div>
              {user ? (
                 <div className="px-3 py-2">
                   {/* 모바일 메뉴의 이메일도 Link로 감싸줍니다. */}
                   <Link to="/mypage" onClick={() => setIsMenuOpen(false)} className="block text-brand-light mb-2 hover:text-brand-gold transition-colors">
                     {user.email}
                   </Link>
                   <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" className="w-full">
                     로그아웃
                   </Button>
                 </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-brand-gray text-brand-gold' : 'text-brand-light hover:bg-brand-gray'}`
                  }
                >
                  로그인
                </NavLink>
              )}
            </div>
          </div>
        )}
      </header>

      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginModalOpen(false);
            // 필요 시 회원가입 모달을 여는 로직 추가
          }}
        />
      )}
    </>
  );
};

export default Header;
