import { Line, NavBar } from '@/components/Common';
import { DreamCategory, DreamForm, DreamTitle } from '@/components/Dream';
import { MetaTag } from '@/components/Seo';
import { dreamMetaData } from '@/config/metaData';

const DreamHome = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = dreamMetaData.dreamHome;

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
        <NavBar title="꿈해몽" isResult={false} isBookmark={false} />
        <Line />

        <div className="w-full bg-[#F6F6F6] flex flex-col items-center py-2 sm:py-8">
          <DreamTitle />
          <DreamCategory />
          <DreamForm />
        </div>
      </div>
    </>
  );
};

export default DreamHome;
