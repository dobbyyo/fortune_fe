import { authState, userState } from '@/stores/useAuthStore';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Signup = () => {
	const userData = useRecoilValue(userState);
	const { email, username } = userData;

	const [formData, setFormData] = useState({
		email: '',
		name: '',
		gender: '',
		birth: '',
		birthTime: '',
	});

	const [agreements, setAgreements] = useState({
		allChecked: false,
		termsOfService: false,
		privacyPolicy: false,
		locationInfo: false,
		marketingInfo: false,
		ageOver14: false,
	});

	// 모든 동의사항 체크 핸들러
	const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setAgreements({
			allChecked: checked,
			termsOfService: checked,
			privacyPolicy: checked,
			locationInfo: checked,
			marketingInfo: checked,
			ageOver14: checked,
		});
	};

	// 개별 동의사항 체크 핸들러
	const handleSingleCheck = (key: keyof typeof agreements) => {
		setAgreements((prev) => {
			const updated = { ...prev, [key]: !prev[key] };
			updated.allChecked = updated.termsOfService && updated.privacyPolicy && updated.locationInfo && updated.ageOver14;
			return updated;
		});
	};

	// 입력 핸들러
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	// 폼 제출 핸들러
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 모든 동의사항 확인
		if (!agreements.allChecked) {
			alert('모든 필수 동의사항에 체크해주세요.');
			return;
		}

		// 폼 데이터 콘솔 출력
		console.log('폼 데이터:', formData);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="mb-[28px] text-center">
				<h1 className="text-[50px] font-bold">회원가입</h1>
			</div>

			<div className="max-w-[800px] min-w-[320px] sm:w-[800px] w-auto border-black h-[1px] mb-[50px] bg-[#D9D9D9]" />

			<div className="w-full pb-[26px]">
				<form className="space-y-4 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
					<div className="w-[320px]">
						<label htmlFor="email" className="label text-[25px] font-medium">
							이메일 *
						</label>
						<input
							id="email"
							type="email"
							placeholder="이메일을 입력하세요"
							className="input input-bordered w-full h-[62px]"
							value={formData.email}
							onChange={handleInputChange}
						/>
					</div>

					<div className="w-[320px]">
						<label htmlFor="name" className="label  text-[25px] font-medium">
							이름 *
						</label>
						<input
							id="name"
							type="이름"
							placeholder="이름을 입력하세요"
							className="input input-bordered w-full h-[62px]"
							value={formData.name}
							onChange={handleInputChange}
						/>
					</div>

					<div className="w-[320px]">
						<label htmlFor="gender" className="label text-[25px] font-medium">
							성별 *
						</label>
						<select
							id="gender"
							className="select select-bordered w-full h-[62px]"
							value={formData.gender}
							onChange={handleInputChange}
						>
							<option disabled selected>
								성별을 선택하세요
							</option>
							<option>남성</option>
							<option>여성</option>
						</select>
					</div>

					<div className="w-[320px]">
						<label htmlFor="birth" className="label text-[25px] font-medium">
							생일 *
						</label>
						<select
							id="birth"
							className="select select-bordered w-full h-[62px]"
							value={formData.birth}
							onChange={handleInputChange}
						>
							<option disabled selected>
								생년월일을 선택하세요
							</option>
							<option>1990</option>
							<option>2000</option>
							<option>2010</option>
						</select>
					</div>

					<div className="w-[320px]">
						<label htmlFor="birthTime" className="label text-[25px] font-medium">
							태어난 시간 *
						</label>
						<select
							id="birthTime"
							className="select select-bordered w-full h-[62px]"
							value={formData.birthTime}
							onChange={handleInputChange}
						>
							<option disabled selected>
								태어난 시간을 선택하세요
							</option>
							<option>11:50</option>
							<option>11:51</option>
						</select>
					</div>
					<div className="w-full flex flex-col justify-center items-center mb-[69px]">
						<div className="space-y-2">
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.allChecked}
									onChange={handleAllChecked}
								/>
								<span className="font-semibold text-gray-700">아래 약관에 모두 동의합니다.</span>
							</label>
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.termsOfService}
									onChange={() => handleSingleCheck('termsOfService')}
								/>
								<span>
									이용약관 필수 동의
									<a href="#" className="text-blue-500 underline">
										자세히 보기
									</a>
								</span>
							</label>
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.privacyPolicy}
									onChange={() => handleSingleCheck('privacyPolicy')}
								/>
								<span>
									개인정보 처리방침 필수 동의{' '}
									<a href="#" className="text-blue-500 underline">
										자세히 보기
									</a>
								</span>
							</label>
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.locationInfo}
									onChange={() => handleSingleCheck('locationInfo')}
								/>
								<span>
									위치정보 이용 필수 동의{' '}
									<a href="#" className="text-blue-500 underline">
										자세히 보기
									</a>
								</span>
							</label>
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.marketingInfo}
									onChange={() => handleSingleCheck('marketingInfo')}
								/>
								<span>
									마케팅 정보 수신 선택 동의{' '}
									<a href="#" className="text-blue-500 underline">
										자세히 보기
									</a>
								</span>
							</label>
							<label className="flex items-center space-x-2 cursor-pointer">
								<input
									type="checkbox"
									className="checkbox"
									checked={agreements.ageOver14}
									onChange={() => handleSingleCheck('ageOver14')}
								/>
								<span>만 14세 이상에 필수 동의</span>
							</label>
						</div>
					</div>
					<button className="btn btn-primary w-full" type="submit">
						계정 생성하기
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
