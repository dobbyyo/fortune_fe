const Bottom = () => {
  return (
    <div className="mt-10 w-full border-t-8 flex justify-center gap-10 py-4">
      <button className="flex flex-col items-center">
        <img src="/common/speaker-icon.jpg" alt="공지사항" className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] mb-2" />
        <span className="text-clamp30 font-normal">공지사항</span>
      </button>
      <button className="flex flex-col items-center">
        <img src="/common/mail-icon.jpg" alt="개발자에게" className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] mb-2" />
        <span className="text-clamp30 font-normal">개발자에게</span>
      </button>
      <button className="flex flex-col items-center">
        <img src="/on-bookmark-icon.jpg" alt="개발자에게" className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] mb-2" />
        <span className="text-clamp30 font-normal">저장보기</span>
      </button>
    </div>
  );
};

export default Bottom;
