import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TarotCardsActionButton = () => {
  const navigate = useNavigate();

  const goTarotResultPage = useCallback(() => {
    navigate('/tarot/result');
  }, []);

  return (
    <div className="w-full flex justify-center mt-8">
      <button
        onClick={goTarotResultPage}
        className="bg-[#A47AF1] text-white text-clamp30 font-medium py-2 mb-[40px]
    rounded-[30px] hover:bg-purple-400 transition w-[320px] sm:w-[400px]"
      >
        결과보기
      </button>
    </div>
  );
};

export default TarotCardsActionButton;
