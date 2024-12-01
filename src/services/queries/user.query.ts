import { useQuery } from '@tanstack/react-query';
import { myDataUser } from '../api/user.service';
import { UserType } from '@/types/userType';

export const useMyDataQuery = () => {
	return useQuery<UserType>({
		queryKey: ['myData'],
		queryFn: async () => {
			const response = await myDataUser();

			return response.data;
		},
		retry: 1,
	});
};
