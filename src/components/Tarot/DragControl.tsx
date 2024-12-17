import { dragPositionState } from '@/stores/useTarotCardStore';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const DragControl = () => {
  const [dragPosition, setDragPosition] = useRecoilState(dragPositionState); // 0 ~ 100%
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !trackRef.current) return;

    const track = trackRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX; // 터치 이벤트 처리
    const rawPosition = clientX - track.left;
    const limitedPosition = Math.min(Math.max(0, rawPosition), track.width); // 트랙 범위 제한
    const normalizedPosition = (limitedPosition / track.width) * 100; // 0 ~ 100% 변환
    setDragPosition(normalizedPosition); // 드래그 위치 업데이트
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        ref={trackRef}
        className="relative mt-4 h-[5px] bg-purple-500 rounded cursor-pointer w-[80%]"
        onMouseMove={dragging ? handleDragMove : undefined}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={dragging ? handleDragMove : undefined} // 터치 이동
        onTouchEnd={handleDragEnd} // 터치 끝
      >
        <img
          id="drag-icon"
          src="/drag-icon.svg"
          alt="Drag Icon"
          className="absolute top-[-15px] w-[40px] h-[30px] -translate-x-1/2"
          style={{ left: `${dragPosition}%` }} // 퍼센트로 위치 설정
          draggable={false}
          onMouseDown={handleDragStart} // 마우스 드래그 시작
          onTouchStart={handleDragStart} // 터치 시작
        />
      </div>
    </div>
  );
};

export default DragControl;
