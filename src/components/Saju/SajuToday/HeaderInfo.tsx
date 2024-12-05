import { userState } from '@/stores/useAuthStore';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

const HeaderInfo = () => {
  const myData = useRecoilValue(userState);
  const username = myData?.username;
  const gender = myData?.gender === 'MAN' ? '남' : '여';
  const birthDate = dayjs(myData?.birth_date).format('YYYY년 MM월 DD일');

  if (!myData) return null;

  return (
    <div className="w-full flex justify-evenly sm:justify-center items-center sm:px-[70px] mt-[50px] bg-[#F2F2F2] py-2 rounded-[10px]">
      <p className="font-medium text-clamp30 mr-2">{username}</p>
      <p className="font-normal text-clamp30 mr-2">{gender}</p>
      <p className="font-normal text-clamp30">{birthDate} (양력)</p>
    </div>
  );
};

export default HeaderInfo;
