import { useMutation, useQuery } from '@tanstack/react-query';
import { myDataUser, updateMyDataUser } from '../api/user.service';
import { ApiUserUpdateDataResponse, UserType, UserUpdatePayload } from '@/types/userType';
import { loadingState } from '@/stores/useLoadingStore';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/stores/useAuthStore';

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

export const useMyDataUpdateMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setUserData = useSetRecoilState(userState);
  return useMutation<ApiUserUpdateDataResponse, Error, { payload: UserUpdatePayload }>({
    mutationKey: ['myDataUpdate'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await updateMyDataUser(payload);

      return response;
    },
    onSuccess: (response) => {
      const { myInfo } = response.data;
      setUserData((prev: any) => ({
        ...prev,
        gender: myInfo.gender,
        birth_date: myInfo.birth_date,
        birth_time: myInfo.birth_time,
        updated_at: myInfo.updated_at,
      }));
      return myInfo;
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
};
