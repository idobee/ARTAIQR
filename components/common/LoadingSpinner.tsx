import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-gold"></div>
    </div>
  );
};

export default LoadingSpinner;
