interface ResponsiveImageProps {
  webpSrc: string;
  pngSrc: string;
  alt: string;
  className?: string;
  handleClick?: () => void;
}

const ResponsiveImage = ({ webpSrc, pngSrc, alt, className, handleClick }: ResponsiveImageProps) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={pngSrc} alt={alt} className={className} loading="lazy" onClick={handleClick} />
    </picture>
  );
};

export default ResponsiveImage;
