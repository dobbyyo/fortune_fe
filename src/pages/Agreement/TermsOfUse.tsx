import { BackNavBar, Line } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { authMetaData } from '@/config/metaData';

// 이용약관
const TermsOfUse = () => {
  const { title, description, keywords, canonical, ogTitle, ogDescription } = authMetaData.termsOfUse;

  const terms = [
    {
      title: '제1조 (목적)',
      content:
        "본 약관은 [운세 어플 이름](이하 '회사')가 제공하는 서비스(이하 '서비스')를 이용함에 있어 회사와 사용자 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.",
    },
    {
      title: '제2조 (정의)',
      content:
        '서비스: 회사가 제공하는 모든 운세 관련 정보, 상담, 콘텐츠 및 부가 서비스를 의미합니다.\n사용자: 본 약관에 따라 회사가 제공하는 서비스를 이용하는 모든 개인을 말합니다.\n계정: 사용자가 서비스를 이용하기 위해 설정한 ID와 비밀번호 등의 정보입니다.',
    },
    {
      title: '제3조 (약관의 효력 및 변경)',
      content:
        '본 약관은 서비스를 이용하려는 모든 사용자에게 효력이 발생합니다.\n회사는 필요 시 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 사전 고지합니다.\n사용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.',
    },
    {
      title: '제4조 (회원가입 및 계정 관리)',
      content:
        '사용자는 회사가 정한 절차에 따라 회원가입을 완료해야 합니다.\n 사용자는 정확하고 최신의 정보를 제공해야 하며, 허위 정보를 제공할 경우 서비스 이용이 제한될 수 있습니다.\n계정 정보의 관리 책임은 사용자 본인에게 있으며, 이를 제3자가 이용하지 않도록 해야 합니다.',
    },
    {
      title: '제5조 (서비스의 제공 및 변경)',
      content:
        '회사는 사용자가 신청한 서비스에 대해 안정적으로 제공할 의무를 가집니다.\n회사는 기술적 필요나 정책에 따라 서비스의 내용을 변경할 수 있으며, 사전에 이를 공지합니다.',
    },
    {
      title: '제6조 (서비스 이용 제한)',
      content:
        '회사는 다음과 같은 경우 서비스 이용을 제한할 수 있습니다.\n타인의 개인정보를 도용하거나 허위 정보를 입력한 경우\n서비스 운영을 고의로 방해한 경우\n공공질서 및 미풍양속을 저해하는 행위를 한 경우',
    },
    {
      title: '제7조 (결제 및 환불)',
      content:
        '서비스 이용 과정에서 결제가 필요한 경우, 사용자는 회사가 정한 방식에 따라 결제를 진행해야 합니다.\n결제 후 환불은 관련 법령 및 회사의 환불 정책에 따릅니다.',
    },
    {
      title: '제8조 (회사의 의무)',
      content:
        '회사는 관련 법령과 본 약관을 준수하며, 안정적인 서비스 제공을 위해 노력합니다.\n회사는 개인정보 보호를 위해 최선을 다하며, 이를 위한 기술적·관리적 조치를 취합니다.',
    },
    {
      title: '제9조 (사용자의 의무)',
      content:
        '사용자는 본 약관 및 관련 법령을 준수해야 하며, 서비스 이용 과정에서 타인의 권리를 침해하거나 부당한 이익을 추구해서는 안 됩니다.\n사용자는 서비스의 안정적 운영을 방해하는 행위를 해서는 안 됩니다.',
    },
    {
      title: '제10조 (면책 조항)',
      content:
        '회사는 천재지변, 시스템 장애 등 회사가 통제할 수 없는 사유로 인해 서비스가 중단된 경우 책임을 지지 않습니다.\n회사는 사용자가 서비스를 이용하며 얻은 정보에 대해 신뢰도나 정확성에 대해 보증하지 않습니다.',
    },
    {
      title: '제11조 (분쟁 해결)',
      content:
        '본 약관과 관련하여 회사와 사용자 간에 발생한 분쟁은 상호 협의를 통해 해결합니다.\n협의가 이루어지지 않을 경우 관련 법령에 따라 관할 법원에서 해결합니다.',
    },
    {
      title: '부칙',
      content: '본 약관은 2024년 12월 01일부터 시행됩니다.',
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
        <BackNavBar title="이용약관" />
        <Line />
        <div className="w-full px-4 mt-6">
          <div className="p-4 rounded-lg shadow-md">
            {terms.map((term, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-bold text-left text-gray-900 text-[13px] sm:text-[15px] mb-2">{term.title}</h3>
                <p className="whitespace-pre-wrap text-start text-gray-800 text-[13px] sm:text-[15px] leading-relaxed">
                  {term.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
