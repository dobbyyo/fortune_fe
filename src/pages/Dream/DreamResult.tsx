import { BackNavBar, Line } from '@/components/Common';
import { DreamResultList } from '@/components/Dream';
import { MetaTag } from '@/components/Seo';
import { dreamMetaData } from '@/config/metaData';

const DreamResult = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = dreamMetaData.dreamResult;

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
        <BackNavBar title="꿈해몽" />

        <Line />

        <DreamResultList />
      </div>
    </>
  );
};

export default DreamResult;
