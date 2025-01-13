import { LoadingBar, NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { sajuMetaData } from '@/config/metaData';
import { useTomorrowFortuneExplainQuery } from '@/services/queries/saju.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useRecoilValue } from 'recoil';

const SajuTomorrow = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = sajuMetaData.sajuResult;

  const userId = useRecoilValue(userIdSelector);

  const { data, isLoading } = useTomorrowFortuneExplainQuery(userId, {
    enabled: userId !== undefined,
    staleTime: 60 * 60 * 1000,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingBar />;
  }

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
      <div className="w-full h-full flex flex-col items-center">
        <NavBar title="내일의 운세" isResult={false} isBookmark={false} />
        <div className="w-full p-2">
          <div className="w-full">
            {data && (
              <>
                {[
                  { title: '총운', content: data.tomorrowFortune.generalFortune },
                  { title: '재물운', content: data.tomorrowFortune.wealthFortune },
                  { title: '연애운', content: data.tomorrowFortune.loveFortune },
                  { title: '사업운', content: data.tomorrowFortune.careerFortune },
                  { title: '건강운', content: data.tomorrowFortune.healthFortune },
                  { title: '학업운', content: data.tomorrowFortune.studyFortune },
                ].map((item, index) => (
                  <div className="py-2" key={item.title}>
                    <div key={index} className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                      <h3 className="font-bold text-clamp30 text-start px-2">🍀{item.title}</h3>
                    </div>
                    <div className="flex justify-start items-center mt-2">
                      <p className="font-normal text-clamp25 text-start px-2">{item.content}</p>
                    </div>
                  </div>
                ))}

                <div className="w-full h-2 border-b-2 border-dotted border-b-[#DECEFF] mx-auto"></div>

                {/* 행운의 요소 */}
                <div className="py-2 mt-5">
                  <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                    <h3 className="font-bold text-clamp30 text-start px-2">🍀행운을 가져오는 것들</h3>
                  </div>
                  <div className="flex justify-start items-center mt-2">
                    <ul className="font-normal text-clamp25 text-start px-2">
                      {data.tomorrowFortune.luckyElements.map((element, index) => (
                        <li key={index}>{element}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 행운의 코디 */}
                <div className="py-2 mt-5">
                  <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                    <h3 className="font-bold text-clamp30 text-start px-2">🍀행운을 가져오는 것들</h3>
                  </div>
                  <div className="flex justify-start items-center mt-2">
                    <p className="font-normal text-clamp25 text-start px-2">{data.tomorrowFortune.luckyOutfit}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SajuTomorrow;
