import { Line, NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { ActionButtons, CardSlider, CardTitle, SelectedCards, TabNavigation } from '@/components/Tarot';
import { tarotMetaData } from '@/config/metaData';

const Tarot = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = tarotMetaData.tarot;

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
        <NavBar title="타로" isResult={false} isBookmark={false} />
        <Line />

        <TabNavigation />
        <div className="w-full bg-[#f1f1f1] mt-[49px]">
          <CardTitle />
          <CardSlider />
          {/* <DragControl /> */}
          <SelectedCards />
          <ActionButtons />
        </div>
      </div>
    </>
  );
};

export default Tarot;
