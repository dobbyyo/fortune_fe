import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px 기준으로 모바일 여부 판단
    };

    handleResize(); // 초기화
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 등록

    return () => {
      window.removeEventListener('resize', handleResize); // 클린업
    };
  }, []);

  // 애니메이션 설정 (모바일/데스크탑)
  const variants = {
    initial: { opacity: 1, x: isMobile ? 10 : 50 }, // 모바일: 10px, 데스크탑: 50px
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: isMobile ? -10 : -50 }, // 모바일: -10px, 데스크탑: -50px
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
