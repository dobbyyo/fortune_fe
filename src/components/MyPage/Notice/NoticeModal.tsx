import { GetNoticeData } from '@/types/myPageType';

const NoticeModal = ({
  open,
  selectedNotice,
  close,
}: {
  open: boolean;
  selectedNotice: GetNoticeData;
  close: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {open && (
        <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[700px] py-[30px]">
          <h3 className="text-clamp35 font-bold mb-4 text-start">{selectedNotice.title}</h3>
          <p className="text-clamp30 font-normal mb-6 border-2 border-[#404040] rounded-[20px] p-5 text-start">
            {selectedNotice.content}
          </p>
          <button
            onClick={close}
            className="w-[200px] py-3 bg-[#A47AF1] text-white font-bold rounded-[30px] text-clamp35"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeModal;
