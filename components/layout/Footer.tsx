
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} 아트 AI 큐레이터. 모든 권리 보유.</p>
        <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Facebook</a>
            <a href="#" className="hover:text-brand-gold transition-colors">X</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
