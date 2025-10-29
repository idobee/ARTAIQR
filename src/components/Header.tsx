import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-brand-gold'
    : 'text-brand-light hover:text-brand-gold transition-colors';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur border-b border-brand-gray/40">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 좌측: 사이트 타이틀 */}
        <Link to="/" className="text-brand-gold font-semibold tracking-wide">
          Art AI Curation
        </Link>

        {/* 중앙: 메뉴 */}
        <ul className="hidden md:flex gap-6 text-sm">
          <li><NavLink to="/exhibitions" className={linkClass}>전시</NavLink></li>
          <li><NavLink to="/artworks" className={linkClass}>작품</NavLink></li>
          <li><NavLink to="/artists" className={linkClass}>작가</NavLink></li>
          <li><NavLink to="/curations" className={linkClass}>큐레이션</NavLink></li>
          <li><NavLink to="/education" className={linkClass}>교육</NavLink></li>
        </ul>

        {/* 우측: 로그인/회원가입 */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-3 py-1.5 rounded-md text-sm border border-brand-gray text-brand-light hover:text-brand-gold hover:border-brand-gold transition-colors">
            로그인
          </Link>
          <Link to="/signup" className="px-3 py-1.5 rounded-md text-sm bg-brand-gold text-black hover:opacity-90 transition-opacity">
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;