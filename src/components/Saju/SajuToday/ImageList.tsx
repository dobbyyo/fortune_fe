interface ImageListProps {
  images: string[];
}

const ImageList = ({ images }: ImageListProps) => {
  return (
    <div className="flex justify-evenly items-center px-5">
      {images.map((url, index) => (
        <div key={index} className="flex justify-center items-center">
          <img src={url} alt={`element-${index}`} className="w-[52px] h-[52px] sm:w-[100px] sm:h-[100px]" />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
