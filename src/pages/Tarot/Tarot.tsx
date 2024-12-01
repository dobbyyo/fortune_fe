import { NavBar } from '@/components/Common';
import { ActionButtons, CardSlider, CardTitle, DragControl, SelectedCards, TabNavigation } from '@/components/Tarot';

const Tarot = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<NavBar title="타로" />
			<TabNavigation />
			<div className="w-full bg-[#f1f1f1] mt-[49px]">
				<CardTitle />
				<CardSlider />
				<DragControl />
				<SelectedCards />
				<ActionButtons />
			</div>
		</div>
	);
};

export default Tarot;
