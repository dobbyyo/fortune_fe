interface BaseResponse {
	status: number; // HTTP 상태 코드 (200, 401 등)
	message: string; // 메시지 ("successful", "Authentication failed" 등)
}

export interface SuccessResponse<T> extends BaseResponse {
	data: T; // 성공 시 반환되는 데이터
}

export interface ErrorResponse extends BaseResponse {
	timestamp: string; // 에러 발생 시각
	path: string; // 요청 경로
}

// export type ApiResponse<T> = SuccessResponse<T>;
