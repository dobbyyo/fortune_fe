import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useWithdrawalMutation } from '@/services/queries/auth.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Withdrawal = () => {
  const { isLoading } = useRequireAuth();
  const [reason, setReason] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const userId = useRecoilValue(userIdSelector);

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  const { mutate: withdrawal } = useWithdrawalMutation();

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    if (!isConfirmed) {
      alert('탈퇴 동의를 체크해주세요.');
      return;
    }

    withdrawal(Number(userId));
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <BackNavBar title="탈퇴하기" />
      <Line />
      <h2 className="text-clamp35 font-normal text-center mt-8">왜 떠나시나요?</h2>
      <textarea
        className="w-full text-clamp25 font-normal mt-4 border border-gray-300 rounded-md p-4 text-base resize-none h-[150px] focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="이유를 꼭 알려주세요."
        value={reason}
        onChange={handleReasonChange}
      ></textarea>
      {error && <p className="text-red-500 text-clamp25 mt-2">{error}</p>}

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="confirm"
          className="w-5 h-5 mr-2"
          checked={isConfirmed}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="confirm" className="text-clamp25 text-red-500">
          ‘탈퇴하기’ 버튼을 누르면 모든 정보가 사라집니다.
        </label>
      </div>

      <button
        className={`mt-6 w-full py-3 text-white font-bold rounded-lg ${
          isConfirmed ? 'bg-purple-400' : 'bg-gray-300 cursor-not-allowed'
        }`}
        disabled={!isConfirmed}
        onClick={handleSubmit}
      >
        탈퇴하기
      </button>
    </div>
  );
};

export default Withdrawal;
