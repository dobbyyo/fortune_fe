import { useLogoutMutation } from '@/services/queries/auth.query';
import { authState } from '@/stores/useAuthStore';
import { useRecoilValue } from 'recoil';

const LogoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { mutate: logout } = useLogoutMutation();
  const authData = useRecoilValue(authState);

  const handleLogout = () => {
    if (authData.isAuthenticated) {
      logout();
    } else {
      alert('로그인이 필요합니다.');
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <p className="text-center text-clamp35 font-normal">로그아웃 하시겠습니까?</p>
        <p className="text-center text-clamp35 font-normal mt-2">지금까지의 기록이 사라져요</p>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="w-full text-blue-500 text-clamp30 font-medium border-t border-gray-200 pt-4 text-center"
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-red-500 text-clamp30 font-medium border-t border-gray-200 pt-4 text-center"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
