import { agreementsState } from '@/stores/useSignupStore';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const SignupAgreements = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useRecoilState(agreementsState);

  const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreements({
      allChecked: checked,
      termsOfService: checked,
      privacyPolicy: checked,
      marketingInfo: checked,
    });
  };

  const handleSingleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updated.allChecked = updated.termsOfService && updated.privacyPolicy;
      return updated;
    });
  };

  const goAgreementsPage = (url: string) => {
    navigate(url);
  };

  return (
    <div className="flex flex-col justify-center items-center ml-[20px]">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="checkbox" checked={agreements.allChecked} onChange={handleAllChecked} />
            <span className="text-[#404040] text-[20px] font-normal">아래 약관에 모두 동의합니다.</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreements.termsOfService}
              onChange={() => handleSingleCheck('termsOfService')}
            />
            <span className="text-[#404040] text-[20px] font-normal">
              이용약관 필수 동의
              <button onClick={() => goAgreementsPage('/termsOfUse')} className="text-blue-500 underline ml-2">
                자세히 보기
              </button>
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreements.privacyPolicy}
              onChange={() => handleSingleCheck('privacyPolicy')}
            />
            <span className="text-[#404040] text-[20px] font-normal">
              개인정보 처리방침 필수 동의
              <button
                onClick={() => goAgreementsPage('/personalInformationTerms')}
                className="text-blue-500 underline ml-2"
              >
                자세히 보기
              </button>
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreements.marketingInfo}
              onChange={() => handleSingleCheck('marketingInfo')}
            />
            <span className="text-[#404040] text-[20px] font-normal">
              마케팅 정보 수신 선택 동의
              <button
                onClick={() => goAgreementsPage('/marketingUseAgreement')}
                className="text-blue-500 underline ml-2"
              >
                자세히 보기
              </button>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignupAgreements;
