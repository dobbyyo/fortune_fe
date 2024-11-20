import { dragPositionState } from '@/stores/useTarotCardStore';
import React, { MouseEvent, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const DragControl = () => {
	const totalCards = 78;
	const [dragPosition, setDragPosition] = useRecoilState(dragPositionState);
	const [dragging, setDragging] = useState(false);
	const trackRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (e: MouseEvent) => {
		if (e.target instanceof HTMLElement && e.target.id === 'drag-icon') {
			setDragging(true);
		}
	};

	const handleDragMove = (e: React.MouseEvent) => {
		if (!dragging || !trackRef.current) return;

		const track = trackRef.current.getBoundingClientRect();

		const rawPosition = e.clientX - track.left;
		const limitedPosition = Math.min(Math.max(0, rawPosition), track.width);
		const positionPerCard = track.width / (totalCards - 1);
		const adjustedPosition = Math.round(limitedPosition / positionPerCard) * positionPerCard;

		setDragPosition(adjustedPosition);
	};

	const handleDragEnd = () => {
		setDragging(false);
	};

	return (
		<div className="flex justify-center items-center">
			<div
				ref={trackRef}
				className="relative mt-4 h-[5px] bg-purple-500 rounded cursor-pointer w-[80%]"
				onMouseDown={handleDragStart}
				onMouseMove={dragging ? handleDragMove : undefined}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
			>
				<img
					id="drag-icon"
					src="/drag-icon.svg"
					alt="Drag Icon"
					className="absolute top-[-15px] w-[40px] h-[30px] -translate-x-1/2"
					style={{ left: `${dragPosition}px` }}
					draggable={false}
					onMouseDown={handleDragStart}
				/>
			</div>
		</div>
	);
};

export default DragControl;
