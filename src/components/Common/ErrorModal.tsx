import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorModalProps {
  message?: string;
}

const ErrorModal: FC<ErrorModalProps> = ({ message = '다시 한 번 시도해주세요.' }) => {
  const navigate = useNavigate();
  const onBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
        <h2 className="text-lg font-bold text-red-600">오류 발생</h2>
        <p className="text-gray-700 text-center">{message}</p>
        <button
          onClick={onBackPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
