import { useQuery } from '@tanstack/react-query';
import { getCSRFToken } from '../api/csrf.service';

export const useCSRFQuery = () => {
	return useQuery({
		queryKey: ['csrf'],
		queryFn: async () => {
			const response = await getCSRFToken();
			return response;
		},
	});
};
