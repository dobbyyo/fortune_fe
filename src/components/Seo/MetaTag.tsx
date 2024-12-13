import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const MetaTag: FC<MetaTagProps> = ({
  title,
  description,
  keywords = '',
  canonical,
  robots = 'index, follow',
  ogTitle,
  ogDescription,
}) => {
  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph 태그 */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      <meta property="og:image" content="https://fortunescape.co.kr/seo/seo-icon.jpeg" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
};

export default MetaTag;
