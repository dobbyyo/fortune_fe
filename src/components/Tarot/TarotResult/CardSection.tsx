import { FC } from 'react';

interface CardSectionProps {
  title: string;
  content: string;
}

const CardSection: FC<CardSectionProps> = ({ title, content }) => {
  return (
    <div className="mt-4 text-start flex flex-col items-start w-full">
      <div className="bg-[#D9D9D9] w-full mb-4 py-2 pl-2">
        <h4 className="text-clamp30 font-bold">{title}</h4>
      </div>
      <p className="text-clamp25 font-normal indent-2 mb-[30px]">{content}</p>
    </div>
  );
};

export default CardSection;
