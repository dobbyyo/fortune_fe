import { useNavigate } from 'react-router-dom';

const BackNavBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  // 뒤로가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full flex items-center">
      <img
        src="/common/back-icon.jpg"
        alt="back-icon"
        className="absolute left-0 w-[50px] h-[50px] cursor-pointer"
        onClick={handleBackClick}
      />
      <h1 className="pl-2 mx-auto font-bold text-clamp50">{title}</h1>
    </div>
  );
};

export default BackNavBar;
