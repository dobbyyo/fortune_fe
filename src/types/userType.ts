import { SuccessResponse } from '@/types/apiType';

export interface UserLanguage {
  user_id: number;
  language: string;
}

export interface UserNotification {
  user_id: number;
  benefit: boolean;
  horoscope: boolean;
}

export interface UserProfile {
  user_id: number;
  profile_url: string;
}

export interface UserPassword {
  user_id: number;
  password_lock_status: boolean;
  hash_password: string | null;
}

export interface UserResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  username: string;
  provider: string;
  email: string;
  gender: string;
  birth_date: string;
  birth_time: string;
  calendar_type: string | null;
  language: UserLanguage;
  notification: UserNotification;
  profile: UserProfile;
  password: UserPassword;
}

export interface UserType {
  myInfo: UserResponse;
}

export type ApiUserDataResponse = SuccessResponse<UserType>;

// 내 정보 업데이트
export interface UserUpdatePayload {
  username: string;
  birth_date: string;
  birth_time: string;
  gender: string;
  userId: number;
}

export interface UserUpdateResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  username: string;
  provider: string;
  email: string;
  gender: string;
  birth_date: string;
  birth_time: string;
  calendar_type: string | null;
}

export interface UserUpdateType {
  myInfo: UserUpdateResponse;
}

export type ApiUserUpdateDataResponse = SuccessResponse<UserUpdateType>;
