import {
  ConstellationFortuneType,
  TodayFortuneExplanationType,
  TodayZodiacFortuneExplanationType,
} from '@/types/fortuneType';
import { UserResponse } from '@/types/userType';

export const mapTodayFortuneData = (explainFortune: TodayFortuneExplanationType) => ({
  totalFortuneTitle: '총운',
  totalFortuneDescription: explainFortune.explanationData.generalFortune,
  wealthFortuneTitle: '재물운',
  wealthFortuneDescription: explainFortune.explanationData.wealthFortune,
  loveFortuneTitle: '연애운',
  loveFortuneDescription: explainFortune.explanationData.loveFortune,
  businessFortuneTitle: '사업운',
  businessFortuneDescription: explainFortune.explanationData.careerFortune,
  healthFortuneTitle: '건강운',
  healthFortuneDescription: explainFortune.explanationData.healthFortune,
  studyFortuneTitle: '학업운',
  studyFortuneDescription: explainFortune.explanationData.studyFortune,
  luckyItemsTitle: '행운의 요소',
  luckyItem1: explainFortune.explanationData.luckyElements[0],
  luckyItem2: explainFortune.explanationData.luckyElements[1],
  luckyOutfitTitle: '행운의 코디',
  luckyOutfitDescription: explainFortune.explanationData.luckyOutfit,
});

export const mapZodiacFortuneData = (fortuneZodiac: TodayZodiacFortuneExplanationType, userData: UserResponse) => ({
  zodiacTitle: fortuneZodiac.zodiacFortune.name,
  zodiacMainDescription: fortuneZodiac.zodiacFortune.zodiacGeneral,
  zodiacSubDescription: fortuneZodiac.zodiacFortune.zodiacToday,
  yearOfBirth: userData.birth_date.split('-')[0],
  imageUrl: fortuneZodiac.zodiacFortune.image_url,
});

export const mapStarSignFortuneData = (fortuneConstellation: ConstellationFortuneType, userData: UserResponse) => ({
  starSign: fortuneConstellation.constellation.name,
  starMainDescription: fortuneConstellation.constellation.constellationGeneral,
  starSubDescription: fortuneConstellation.constellation.constellationToday,
  imageUrl: fortuneConstellation.constellation.image_url,
  year: userData.birth_date.split('-')[0],
});
