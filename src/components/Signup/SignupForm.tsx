import { ChangeEvent, useEffect } from 'react';
import { userState } from '@/stores/useAuthStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDataState } from '@/stores/useSignupStore';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(formDataState);

  useEffect(() => {
    if (userData !== null) {
      const { email, username, profile } = userData;
      setFormData((prev) => ({ ...prev, email, username, avatar: profile.profile_url }));
    } else if (userData === null) {
      navigate('/login');
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const times = Array.from({ length: 24 * 60 }, (_, i) => {
    const hours = Math.floor(i / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (i % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  return (
    <div className="w-full pb-[26px] px-2 sm:px-0">
      <form className="space-y-[14px] flex flex-col justify-center items-center">
        <div className="w-full sm:w-[320px]">
          <label htmlFor="email" className="label text-[20px] font-medium">
            이메일 *
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="input input-bordered w-full h-[50px]"
            value={formData.email}
            disabled
          />
        </div>

        <div className="w-full sm:w-[320px]">
          <label htmlFor="username" className="label  text-[20px] font-medium">
            이름 *
          </label>
          <input
            id="username"
            type="이름"
            placeholder="이름을 입력하세요"
            className="input input-bordered w-full h-[50px]"
            value={formData.username}
            disabled
          />
        </div>

        <div className="w-full sm:w-[320px]">
          <label htmlFor="gender" className="label text-[20px] font-medium">
            성별 *
          </label>
          <select
            id="gender"
            className="select select-bordered w-full h-[50px]"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option disabled value="">
              성별을 선택하세요
            </option>
            <option>남성</option>
            <option>여성</option>
          </select>
        </div>

        <div className="w-full sm:w-[320px]">
          <label htmlFor="birthDate" className="label text-[20px] font-medium">
            생일 *
          </label>
          <input
            id="birthDate"
            type="date"
            className="input input-bordered w-full h-[50px]"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full sm:w-[320px]">
          <label htmlFor="birthTime" className="label text-[20px] font-medium">
            태어난 시간 *
          </label>
          <select
            id="birthTime"
            className="select select-bordered w-full h-[50px]"
            value={formData.birthTime}
            onChange={handleInputChange}
          >
            <option disabled value="">
              태어난 시간을 선택하세요
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
