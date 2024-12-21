import React, { FC, useState } from 'react';
import LazyLoad from 'react-lazyload';

interface ImageProps {
  src: string;
  alt: string;
  defaultWidth: number; // 기본 너비
  defaultHeight: number; // 기본 높이
  smWidth?: number; // sm: 크기
  smHeight?: number; // sm: 높이
  className?: string; // Tailwind 추가 클래스
  placeholder?: JSX.Element; // 플레이스홀더
}

const ReSizeImage: FC<ImageProps> = ({
  src,
  alt,
  defaultWidth,
  defaultHeight,
  smWidth,
  smHeight,
  className = '',
  placeholder = <div className="bg-gray-200 animate-pulse w-full h-full" />,
}) => {
  const [loaded, setLoaded] = useState(false);

  const srcSet = [
    smWidth && smHeight ? `${src}?w=${smWidth}&h=${smHeight} 640w` : null,
    `${src}?w=${defaultWidth}&h=${defaultHeight} 320w`,
  ]
    .filter(Boolean)
    .join(', ');

  const sizes = [`(min-width: 640px) ${smWidth || defaultWidth}px`, `${defaultWidth}px`].join(', ');

  return (
    <LazyLoad height={defaultHeight} offset={100} placeholder={placeholder}>
      <div className={`relative overflow-hidden ${className}`}>
        {!loaded && placeholder} {/* 로딩 전 플레이스홀더 */}
        <img
          src={`${src}?w=${defaultWidth}&h=${defaultHeight}`}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={`absolute top-0 left-0 w-full h-full object-contain ${
            loaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </LazyLoad>
  );
};

export default ReSizeImage;
