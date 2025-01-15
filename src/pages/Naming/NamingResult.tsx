import { BackNavBar, Line } from '@/components/Common';
import { NamingResultList } from '@/components/Naming';
import { MetaTag } from '@/components/Seo';
import { namingMetaData } from '@/config/metaData';

const NamingResult = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = namingMetaData.namingResult;

  return (
    <>
      <MetaTag
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="baseStyle">
        <BackNavBar title="AI 작명가" />

        <Line />

        <NamingResultList />
      </div>
    </>
  );
};

export default NamingResult;
