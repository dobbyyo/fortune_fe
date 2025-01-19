const shareUsingWebAPI = async (shareUrl: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '오늘의 타로 결과',
        text: '타로 결과를 확인해보세요!',
        url: shareUrl,
      });
    } catch (error) {
      console.error('공유 실패 또는 취소:', error);
      throw new Error('공유 실패 또는 취소');
    }
  } else {
    alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
  }
};

export default shareUsingWebAPI;
