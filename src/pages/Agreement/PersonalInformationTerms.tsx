import { BackNavBar, Line } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { authMetaData } from '@/config/metaData';

// 개인정보 이용약관 동의
const PersonalInformationTerms = () => {
  const { title, description, keywords, canonical, ogTitle, ogDescription } = authMetaData.personalInformationTerms;

  const policies = [
    {
      title: '제1조 (수집하는 개인정보 항목)',
      content: `회사는 다음과 같은 개인정보를 수집합니다.
회원가입 시 수집 항목
- 필수: 이름, 이메일 주소, 휴대전화번호, 생년월일, 성별
- 선택: 관심 있는 운세 유형, 기타 개인 설정 정보
서비스 이용 과정에서 수집되는 정보
- 서비스 이용 기록, 접속 로그, 쿠키, IP 주소
결제 서비스 이용 시
- 결제 카드 정보, 거래 기록, 청구지 주소`,
    },
    {
      title: '제2조 (개인정보 수집 및 이용 목적)',
      content: `수집된 개인정보는 다음 목적에 한해 이용됩니다.
- 서비스 제공: 개인화된 운세 정보 제공, 예약 및 상담 진행
- 회원 관리: 본인 확인, 계정 관리, 민원 처리
- 마케팅 및 광고 활용: 맞춤형 혜택 안내, 이벤트 및 프로모션 정보 제공
- 통계 분석: 서비스 개선 및 데이터 분석`,
    },
    {
      title: '제3조 (개인정보 보유 및 이용 기간)',
      content: `회사는 사용자의 개인정보를 수집 및 이용 목적이 달성될 때까지 보유하며, 법령에서 정한 경우 해당 기간 동안 보관합니다.
- 회원 정보: 회원 탈퇴 시 즉시 파기
- 결제 기록: 전자상거래법에 따라 5년간 보관
- 로그 기록: 통신비밀보호법에 따라 3개월간 보관`,
    },
    {
      title: '제4조 (개인정보 제3자 제공)',
      content: `회사는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에만 제공됩니다.
- 사용자가 사전에 동의한 경우
- 법령에 따라 요구되는 경우`,
    },
    {
      title: '제5조 (개인정보 처리 위탁)',
      content: `회사는 서비스 운영을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.
- 위탁업체명: [예: A사]
- 위탁 업무 내용: 데이터 호스팅, 메시지 발송`,
    },
    {
      title: '제6조 (사용자의 권리와 행사 방법)',
      content: `사용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제, 처리 정지 요청할 수 있습니다. 요청은 앱 내 설정 메뉴 또는 고객센터를 통해 접수하실 수 있습니다.`,
    },
    {
      title: '제7조 (개인정보의 파기 절차 및 방법)',
      content: `회사는 개인정보의 보유 기간이 만료되거나 처리 목적이 달성되면 즉시 파기합니다.
- 파기 절차: 개인정보 파기 요청 접수 후 내부 검토를 거쳐 파기
- 파기 방법: 전자 파일은 복구 불가능한 방법으로 삭제, 서면 자료는 분쇄기로 파쇄`,
    },
    {
      title: '제8조 (개인정보 보호를 위한 기술적·관리적 조치)',
      content: `회사는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 취합니다.
- 개인정보 접근 제한
- 암호화된 네트워크를 통한 데이터 전송
- 정기적인 보안 점검 및 교육`,
    },
    {
      title: '제9조 (문의처)',
      content: `개인정보와 관련된 문의는 아래로 연락해 주시기 바랍니다.
- 운영팀 이메일: support@[운세어플].com
- 고객센터 전화번호: 1234-5678`,
    },
    {
      title: '부칙',
      content: '본 약관은 2024년 11월 22일부터 시행됩니다.',
    },
  ];

  return (
    <>
      <MetaTag
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="flex flex-col items-center justify-center">
        <BackNavBar title="개인정보 이용약관" />
        <Line />
        <div className="w-full px-4 mt-6">
          <div className="p-4 rounded-lg shadow-md">
            <p className="text-left w-full text-[15px] mb-10">
              [너의 이름은](이하 "회사")는 사용자의 개인정보를 소중히 여기며, 개인정보 보호법 및 관련 법령을 준수합니다.
              본 약관은 사용자가 서비스를 이용함에 있어 제공한 개인정보가 어떻게 처리되는지 안내합니다.
            </p>
            {policies.map((policy, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-bold text-left text-gray-900 text-[13px] sm:text-[15px] mb-2">{policy.title}</h3>
                <p className="whitespace-pre-wrap text-start text-gray-800 text-[13px] sm:text-[15px] leading-relaxed">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformationTerms;
