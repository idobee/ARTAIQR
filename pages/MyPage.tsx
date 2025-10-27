import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { supabase } from '../services/supabaseClient.ts';
import Button from '../components/common/Button.tsx';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import ErrorMessage from '../components/common/ErrorMessage.tsx';

// 지원 내역 데이터 타입을 정의합니다.
interface CurationApplication {
  id: string;
  created_at: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MyPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<CurationApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('curation_applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setApplications(data || []);
      } catch (err: any) {
        setError('지원 내역을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const getStatusText = (status: CurationApplication['status']) => {
    switch (status) {
      case 'pending': return '검토 중';
      case 'approved': return '승인됨';
      case 'rejected': return '반려됨';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-brand-gold mb-8">마이페이지</h1>

      <div className="bg-brand-gray p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-brand-light mb-4">내 정보</h2>
        <div className="space-y-2 text-brand-light-2">
          <p><span className="font-semibold w-24 inline-block">이름:</span> {user?.user_metadata.full_name || '정보 없음'}</p>
          <p><span className="font-semibold w-24 inline-block">이메일:</span> {user?.email}</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => alert('정보 수정 기능은 준비 중입니다.')}
        >
          정보 수정
        </Button>
      </div>

      <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-brand-light mb-6">교육 지원 내역</h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border border-brand-dark p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">
                    지원일: {new Date(app.created_at).toLocaleDateString()}
                  </p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    app.status === 'approved' ? 'bg-green-500 text-white' :
                    app.status === 'rejected' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {getStatusText(app.status)}
                  </span>
                </div>
                <p className="text-brand-light-2 whitespace-pre-wrap">
                  <span className="font-semibold text-brand-light">지원 동기:</span> {app.motivation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-brand-light-2 text-center">교육 프로그램 지원 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
