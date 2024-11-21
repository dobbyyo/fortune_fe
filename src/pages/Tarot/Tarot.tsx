import {
	ActionButtons,
	CardSlider,
	CardTitle,
	DragControl,
	NavBar,
	SelectedCards,
	TabNavigation,
} from '@/components/Tarot';

const Tarot = () => {
	return (
		<div className="w-full max-w-[800px] mx-auto">
			<NavBar />
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
