import { Line } from '@/components/Common';
import BaseNavBar from '@/components/Common/BaseNavBar';
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
        <BaseNavBar title="오늘의 타로" />
        <Line />

        <TarotCardsTitle />
        <TarotCardsCardLists />
        <TarotCardsActionButton />
      </div>
    </>
  );
};

export default TarotCard;
