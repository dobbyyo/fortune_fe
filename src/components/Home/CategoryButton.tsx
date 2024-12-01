import { useNavigate } from 'react-router-dom';

const CategoryButton = ({ icon, label, pageUrl }: { icon: string; label: string; pageUrl: string }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/${pageUrl}`)}
			className="flex flex-col items-center justify-center w-[110px] h-[110px] bg-[#DECEFF] font-normal rounded-lg shadow-md hover:bg-purple-200 transition"
		>
			<img className="w-[45px] h-[45px]" src={icon} alt="label icon picture" />
			<span className="mt-1 text-clamp30 text-black font-normal">{label}</span>
		</div>
	);
};

export default CategoryButton;
