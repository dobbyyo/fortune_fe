interface ResponsiveImageProps {
  webpSrc: string;
  pngSrc: string;
  alt: string;
  className?: string;
}

const ResponsiveImage = ({ webpSrc, pngSrc, alt, className }: ResponsiveImageProps) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={pngSrc} alt={alt} className={className} loading="lazy" />
    </picture>
  );
};

export default ResponsiveImage;
