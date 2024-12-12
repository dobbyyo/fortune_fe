import { useSetRecoilState } from 'recoil';
import { errorState } from '@/stores/useErrorStore';

const ErrorModal = () => {
  const setError = useSetRecoilState(errorState);

  const handleClose = () => {
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-4">오류 발생</h2>
        <p className="text-sm text-gray-600 mb-6">다시 시도해주세요.</p>
        <button onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          닫기
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
