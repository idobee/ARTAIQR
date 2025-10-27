import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 인증 상태를 확인하는 동안 로딩 스피너를 보여줍니다.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  // 사용자가 로그인 상태이면 요청한 페이지를 보여줍니다.
  if (user) {
    return <>{children}</>;
  }

  // 사용자가 로그인 상태가 아니면 로그인 페이지로 보냅니다.
  // 이때, 원래 가려던 경로를 state에 저장하여 로그인 후 돌아올 수 있도록 합니다.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;