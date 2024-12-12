import { BackNavBar, Line } from '@/components/Common';

const MarketingUseAgreement = () => {
  const sections = [
    {
      title: '1. 개인정보 수집 및 이용 목적',
      content: `회사는 다음의 목적으로 개인정보를 수집 및 이용합니다.
- 서비스 관련 이벤트 및 프로모션 정보 제공
- 할인 쿠폰, 적립금 등 맞춤형 혜택 안내
- 신규 서비스 및 관련 정보 제공
- 서비스 만족도 조사 및 마케팅 데이터 분석`,
    },
    {
      title: '2. 수집하는 개인정보 항목',
      content: `- 이름, 휴대전화번호, 이메일 주소
- 서비스 이용 기록, 관심 있는 운세 유형`,
    },
    {
      title: '3. 보유 및 이용 기간',
      content: `수집된 개인정보는 동의일로부터 서비스 제공 목적 달성 시까지 보유 및 이용됩니다. 
단, 사용자가 동의를 철회하는 경우 즉시 파기합니다.`,
    },
    {
      title: '4. 제3자 제공 및 위탁',
      content: `회사는 사용자의 동의 없이 개인정보를 제3자에게 제공하거나 위탁하지 않습니다.`,
    },
    {
      title: '동의 철회 방법',
      content: `동의하신 후에도 언제든지 설정 메뉴 또는 고객센터를 통해 동의를 철회하실 수 있습니다.`,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <BackNavBar title="이용약관" />
      <Line />
      <div className="w-full px-4 mt-6">
        <div className="p-4 rounded-lg shadow-md">
          <p className="text-left w-full text-[20px] mb-10">
            [너의 이름은](이하 "회사")는 사용자에게 맞춤형 서비스와 혜택을 제공하기 위해 아래와 같이 개인정보를
            활용하고자 합니다. 내용을 자세히 읽어보신 후 동의 여부를 결정해 주시기 바랍니다.
          </p>
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-left text-gray-900 text-[16px] sm:text-[18px] mb-2">{section.title}</h3>
              <p className="whitespace-pre-wrap text-start text-gray-800 text-[14px] sm:text-[16px] leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingUseAgreement;
