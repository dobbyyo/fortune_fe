import { NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { TarotCardsActionButton, TarotCardsCardLists, TarotCardsTitle } from '@/components/Tarot/TarotCards';
import { tarotMetaData } from '@/config/metaData';

const TarotCard = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = tarotMetaData.tarotCard;

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
      <div className="flex flex-col items-center justify-center">
        <NavBar title="오늘의 타로" isResult={false} isBookmark={false} />

        <TarotCardsTitle />
        <TarotCardsCardLists />
        <TarotCardsActionButton />
      </div>
    </>
  );
};

export default TarotCard;
