import { generateTimeOptions } from '@/hooks/dateHook';
import { useMyDataUpdateMutation } from '@/services/queries/user.query';
import { userState } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const BirthInfoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const myData = useRecoilValue(userState);

  const genderOptions = [
    { value: 'MAN', label: '남' },
    { value: 'WOMAN', label: '여' },
    { value: 'ETC', label: '기타' },
  ];

  const [name, setName] = useState(myData?.username || '');
  const [birthDate, setBirthDate] = useState(myData?.birth_date || '');
  const [birthTime, setBirthTime] = useState(myData?.birth_time || '');
  const [gender, setGender] = useState('');

  const timeOptions = generateTimeOptions();

  // 초기값 설정 로직
  useEffect(() => {
    setBirthDate(myData?.birth_date || '');
    setBirthTime(myData?.birth_time || '');

    const matchedGender = genderOptions.find((option) => option.value === myData?.gender);
    if (matchedGender) {
      setGender(matchedGender.value);
    }
  }, [myData]);

  const { mutate: updateMyData } = useMyDataUpdateMutation();

  const handleSave = () => {
    if (birthDate === '' || birthTime === '' || gender === '' || !myData) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    const payload = {
      username: name,
      birth_date: birthDate,
      birth_time: birthTime,
      gender,
      userId: myData.id,
    };
    updateMyData({ payload });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[10px] w-[90%] sm:w-[800px] py-2 sm:py-[30px] px-2 sm:px-10 border-2 shadow-lg">
        <h2 className="text-clamp35 font-bold text-center my-2">생일정보 수정</h2>
        <div className="flex flex-col rounded-[20px] border-2 border-[#404040] py-5 px-3 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-clamp30 font-medium">이름</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
              placeholder="이름 입력"
              className="border rounded p-2 w-[60%] text-clamp25"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-clamp30 font-medium">생년월일 (양력)</span>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border rounded p-2 w-[60%] text-clamp25"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-clamp30 font-medium">태어난 시간</span>
            <select
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="border rounded p-2 w-[60%] text-clamp25"
            >
              <option className="text-clamp25" value="">
                시간 선택
              </option>
              {timeOptions.map((time) => (
                <option key={time} value={time} className="text-clamp25">
                  {time.slice(0, 5)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-clamp30 font-medium">성별</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded p-2 w-[60%] text-clamp25"
            >
              <option value="">성별 선택</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400">
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthInfoModal;
