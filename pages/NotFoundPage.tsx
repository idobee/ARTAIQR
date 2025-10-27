
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-serif font-bold text-brand-gold">404</h1>
      <h2 className="text-3xl font-semibold mt-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-400 mt-2 mb-8">찾고 계신 페이지가 존재하지 않습니다.</p>
      <Link to="/">
        <Button>홈페이지로 가기</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
