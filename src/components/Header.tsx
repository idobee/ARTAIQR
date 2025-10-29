import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const link = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-brand-gold' : 'text-brand-light hover:text-brand-gold';

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 bg-black/80 border-b border-white/10">
    <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <Link to="/" className="text-brand-gold font-semibold">Art AI Curation</Link>
      <ul className="hidden md:flex gap-6 text-sm">
        <li><NavLink to="/exhibitions" className={link}>전시</NavLink></li>
        <li><NavLink to="/artworks" className={link}>작품</NavLink></li>
        <li><NavLink to="/artists" className={link}>작가</NavLink></li>
        <li><NavLink to="/curation" className={link}>큐레이션</NavLink></li>
        <li><NavLink to="/education" className={link}>교육</NavLink></li>
        <li><NavLink to="/art-news" className={link}>아트뉴스</NavLink></li>
      </ul>
      <div className="flex items-center gap-2">
        <Link to="/login" className="px-3 py-1.5 rounded-md text-sm border border-white/20 text-brand-light hover:text-brand-gold">로그인</Link>
        <Link to="/signup" className="px-3 py-1.5 rounded-md text-sm bg-brand-gold text-black hover:opacity-90">회원가입</Link>
      </div>
    </nav>
  </header>
);

export default Header;