import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-red-900 border border-red-400 text-red-100 px-4 py-3 rounded-lg text-center" role="alert">
        <strong className="font-bold">오류!</strong>
        <span className="block sm:inline ml-2">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
