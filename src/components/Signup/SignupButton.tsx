import { useLoginQuery, useSignupQuery } from '@/services/queries/auth.query';
import { agreementsState, formDataState } from '@/stores/useSignupStore';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const SignupButton = () => {
	const aggrements = useRecoilValue(agreementsState);
	const formData = useRecoilValue(formDataState);
	const navigate = useNavigate();
	const { mutateAsync: signupMutation } = useSignupQuery();
	const { mutateAsync: loginMutation } = useLoginQuery();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 모든 동의사항 확인
		if (!aggrements.termsOfService && !aggrements.privacyPolicy) {
			alert('모든 필수 동의사항에 체크해주세요.');
			return;
		}

		try {
			await signupMutation({
				...formData,
				provider: 'kakao',
				birth_date: formData.birthDate,
				birth_time: `${formData.birthTime}:00`,
			});
			console.log('formData.email', formData.email);
			await loginMutation(formData.email);

			navigate('/');
		} catch (error) {
			console.error('회원가입 실패:', error);
		}
	};

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<button className="mt-[50px] btn btn-primary w-full" type="submit">
				계정 생성하기
			</button>
		</form>
	);
};

export default SignupButton;
