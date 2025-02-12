type PredictionCardProps = {
  header: string;
  text: string;
};

const PredictionCard: React.FC<PredictionCardProps> = ({ header, text }) => {
  return (
    <div className="text flex h-[97px] w-full flex-col gap-2 rounded-2xl bg-color5 p-2 md:h-[139px] md:w-[447px] md:gap-1 md:px-[35px] md:py-4">
      <h5 className="text-xs leading-[135%] md:text-base">{header}</h5>
      <p className="text-sm leading-[135%] md:text-xl">{text}</p>
    </div>
  );
};
export default PredictionCard;
