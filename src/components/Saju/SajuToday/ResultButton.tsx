import { useNavigate } from 'react-router-dom';

const ResultButton = () => {
  const navigate = useNavigate();

  const onResultPage = () => {
    navigate('/saju/result');
  };

  return (
    <button
      onClick={onResultPage}
      className="w-full mt-[40px] sm:w-[240px] bg-[#A47AF1] text-white text-clamp30 font-bold sm:rounded-[30px] py-3"
    >
      결과보기
    </button>
  );
};

export default ResultButton;
