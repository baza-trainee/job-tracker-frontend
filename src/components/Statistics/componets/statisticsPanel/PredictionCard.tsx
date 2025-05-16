type PredictionCardProps = {
  header: string;
  text: string;
};

const PredictionCard: React.FC<PredictionCardProps> = ({ header, text }) => {
  return (
    <div className="flex h-[97px] w-full flex-col gap-2 rounded-2xl bg-color1 p-2 dark:bg-color1-transparent md:h-[142px] md:w-[348px] md:gap-1 md:p-4 xl:h-[128px] xl:w-[395px] xl:gap-2 xl:bg-color5 xl:dark:bg-color5-transparent 2xl:h-[139px] 2xl:w-[447px] 2xl:gap-1 2xl:p-4 3xl:h-[193px] 3xl:w-[608px] 3xl:px-8 3xl:py-6">
      <h5 className="text-xs leading-[135%] text-textBlack md:text-sm 2xl:text-base 3xl:text-xl">
        {header}
      </h5>
      <p className="text-sm leading-[135%] text-textBlack md:text-base 2xl:text-xl 3xl:text-[28px] 3xl:leading-normal">
        {text}
      </p>
    </div>
  );
};
export default PredictionCard;
