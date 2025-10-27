import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient.ts';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import ErrorMessage from '../components/common/ErrorMessage.tsx';
// 경로를 수정합니다.
import { useAuth } from '../context/AuthContext.tsx'; 
import { Navigate } from 'react-router-dom';

// Simple admin check: in a real app, this would be based on roles or claims.
const ADMIN_EMAIL = 'admin@example.com';

const AdminApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Only fetch if user is an admin
    if (user?.email === ADMIN_EMAIL) {
      const getApplications = async () => {
        try {
          setLoading(true);
          const data = await fetchApplications();
          setApplications(data);
        } catch (err: any) {
          setError(err.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
      getApplications();
    } else {
      setLoading(false);
    }
  }, [user]);

  // If user is not logged in or not an admin, redirect
  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-serif font-bold text-center mb-12">관리자: 지원서 목록</h1>
      
      {applications.length === 0 ? (
        <p className="text-center text-gray-400">제출된 지원서가 없습니다.</p>
      ) : (
        <div className="bg-brand-gray rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-dark">
              <thead className="bg-brand-dark/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">제출일</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">이름</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">이메일</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">프로필</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">지원동기</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-brand-dark/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(app.created_at).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-light">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{app.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate" title={app.profile}>{app.profile}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate" title={app.motivation}>{app.motivation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplicationsPage;
