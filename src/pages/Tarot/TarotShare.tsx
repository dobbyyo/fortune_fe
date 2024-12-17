import { NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { TarotShareLists } from '@/components/Tarot/TarotShare';
import { tarotMetaData } from '@/config/metaData';

const TarotShare = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = tarotMetaData.shareResult;

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
      <div className="flex flex-col items-center justify-center h-auto">
        <NavBar title="오늘의 타로" isResult={false} isBookmark={false} />
        <TarotShareLists />
      </div>
    </>
  );
};

export default TarotShare;
