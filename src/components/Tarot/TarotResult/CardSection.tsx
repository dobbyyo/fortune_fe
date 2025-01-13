import { FC } from 'react';

interface CardSectionProps {
  title: string;
  content: string;
}

const CardSection: FC<CardSectionProps> = ({ title, content }) => {
  return (
    <div className="mt-4 text-start flex flex-col items-start w-full">
      <div className="bg-[#D9D9D9] w-full mb-4 py-2 pl-2">
        <h4 className="text-[16px] sm:text-[20px] font-bold">{title}</h4>
      </div>
      <p className="mx-1 text-[14px] sm:text-[18px] font-normal mb-[30px]">{content}</p>
    </div>
  );
};

export default CardSection;
