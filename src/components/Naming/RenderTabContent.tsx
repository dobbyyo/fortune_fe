import { AiNaming, ProfessionalNaming } from '@/components/Naming';

const RenderTabContent = ({ activeTabKey }: { activeTabKey: string }) => {
  const tabContentMap: { [key: string]: JSX.Element } = {
    aiNaming: <AiNaming />,
    professionalNaming: <ProfessionalNaming />,
  };

  return tabContentMap[activeTabKey] || <div>탭을 선택하세요</div>;
};

export default RenderTabContent;
