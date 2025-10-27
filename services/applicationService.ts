import { supabase } from './supabaseClient';

export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  profile: string;
  motivation: string;
  programId: string;
  userId: string; // userId 속성을 인터페이스에 추가합니다.
}

/**
 * Submits an application to the Supabase 'applications' table.
 * 
 * @param data The application data to be submitted.
 * @returns A promise that resolves to an object indicating success.
 */
export const submitApplication = async (data: ApplicationData): Promise<{ success: boolean }> => {
    console.log("--- 지원서 제출 (Supabase) ---");
    console.log("제출된 데이터:", data);
    
    const { error } = await supabase
      .from('curation_applications') // 'applications'를 'curation_applications'로 수정합니다.
      .insert([
        { 
          // Supabase 테이블의 컬럼 이름과 일치해야 합니다.
          // 예시: full_name, email, profile, motivation
          user_id: data.userId, // insert 객체에 user_id를 추가합니다.
          full_name: data.name, 
          email: data.email, 
          phone: data.phone, // phone 데이터 추가
          profile: data.profile, 
          motivation: data.motivation,
          target_id: data.programId,
          status: 'pending' // 'status' 컬럼이 있는 경우
        }
      ])
      .select() // insert 후 데이터를 반환받기 위해 .select() 추가
      .single(); // 단일 객체로 반환

    if (error) {
        console.error("Supabase 에러:", error);
        throw new Error(error.message || '서버에서 오류가 발생했습니다. 다시 시도해주세요.');
    }

    console.log("--- 제출 성공 ---");
    return { success: true };
};
