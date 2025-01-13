interface ListDisplayProps {
  items: string[];
  className: string;
}

const ListDisplay = ({ items, className }: ListDisplayProps) => {
  return (
    <div className={`flex justify-evenly items-center ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="mediumText font-medium text-center">
          {item}
        </div>
      ))}
    </div>
  );
};

export default ListDisplay;
