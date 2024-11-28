import { useQuery } from '@tanstack/react-query';
import { myDataUser } from '../api/user.service';
import { ApiUserDataResponse } from '@/types/userType';

export const useMyDataQuery = () => {
	return useQuery<ApiUserDataResponse>({
		queryKey: ['myData'],
		queryFn: async () => {
			const response = await myDataUser();
			return response;
		},
		retry: 1,
	});
};
