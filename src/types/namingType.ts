import { SuccessResponse } from './apiType';

export interface NamingPayload {
  mainTitle: string;
  content: string;
}

export interface NamingData {
  name: string;
  hanja: string | null;
  description: string;
}

export interface AiNamingType {
  naming: NamingData[];
}

export type ApiAiNamingResponse = SuccessResponse<AiNamingType>;
