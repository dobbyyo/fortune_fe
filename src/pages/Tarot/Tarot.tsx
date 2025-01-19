import { Line } from '@/components/Common';
import BaseNavBar from '@/components/Common/BaseNavBar';
import { MetaTag } from '@/components/Seo';
import { ActionButtons, CardSlider, CardTitle, SelectedCards, TabNavigation } from '@/components/Tarot';
import { tarotMetaData } from '@/config/metaData';
import { removeLocalStorage } from '@/lib/localStorage';

const Tarot = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = tarotMetaData.tarot;

  removeLocalStorage('tarotBookmark');

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
        <BaseNavBar title="타로" />
        <Line />
        <TabNavigation />

        <div className="w-full bg-[#f1f1f1] mt-[1px]">
          <CardTitle />
          <CardSlider />
          <SelectedCards />
          <ActionButtons />
        </div>
      </div>
    </>
  );
};

export default Tarot;
