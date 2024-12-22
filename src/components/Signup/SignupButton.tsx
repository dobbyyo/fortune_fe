import { useSignupQuery } from '@/services/queries/auth.query';
import { agreementsState, formDataState } from '@/stores/useSignupStore';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const SignupButton = () => {
  const aggrements = useRecoilValue(agreementsState);
  const formData = useRecoilValue(formDataState);
  const navigate = useNavigate();
  const { mutateAsync: signupMutation } = useSignupQuery();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 동의사항 확인
    if (!aggrements.termsOfService && !aggrements.privacyPolicy) {
      alert('모든 필수 동의사항에 체크해주세요.');
      return;
    }

    await signupMutation({
      email: formData.email,
      username: formData.username,
      provider: 'kakao',
      gender: formData.gender === '남성' ? 'MAN' : formData.gender === '여성' ? 'WOMAN' : 'ETC',
      birth_date: formData.birthDate,
      birth_time: `${formData.birthTime}:00`,
      avatar: formData.avatar,
    });

    // await loginMutation(formData.email);

    navigate('/');
  };

  return (
    <form className="w-full sm:w-[50%] mb-6 px-2 sm:px-0" onSubmit={handleSubmit}>
      <button className="mt-[50px] btn btn-primary w-full" type="submit">
        계정 생성하기
      </button>
    </form>
  );
};

export default SignupButton;
