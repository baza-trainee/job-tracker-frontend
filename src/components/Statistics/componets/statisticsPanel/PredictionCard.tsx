type PredictionCardProps = {
  header: string;
  text: string;
};

const PredictionCard: React.FC<PredictionCardProps> = ({ header, text }) => {
  return (
    <div className="text flex h-[139px] w-[447px] flex-col gap-1 rounded-2xl bg-color5 px-[35px] py-4">
      <h5 className="text-base leading-[135%]">{header}</h5>
      <p className="text-xl leading-[135%]">{text}</p>
    </div>
  );
};
export default PredictionCard;
