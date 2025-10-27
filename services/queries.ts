import { supabase } from './supabaseClient';
import type { ApplicationData } from './applicationService';

export interface ApplicationRecord extends ApplicationData {
  id: number;
  created_at: string;
}

export const fetchApplications = async (): Promise<ApplicationRecord[]> => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
    throw new Error(error.message || '지원서 목록을 불러오는 데 실패했습니다.');
  }

  return data as ApplicationRecord[];
};
