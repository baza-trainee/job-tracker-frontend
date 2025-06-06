import clsx from "clsx";

type CardSoonProps = {
  day: string;
  date: string;
  title: string;
  time: string;
  onClick?: () => void;
};

const CardSoon: React.FC<CardSoonProps> = ({
  day,
  date,
  title,
  time,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "grid w-full rounded-2xl bg-backgroundTertiary transition-colors duration-300 hover:bg-backgroundSecondary dark:hover:bg-color6",
        "grid-cols-[auto_3fr]",
        "px-2 py-3 xl:px-4 xl:py-2 2xl:py-[10px] 3xl:px-6 3xl:py-3",
        "gap-2 2xl:gap-4",
        "mb-2 xl:mb-3 2xl:mb-2"
      )}
      onClick={onClick}
    >
      <div className="flex w-[53px] flex-col items-center text-center">
        <p className="text-[14px] font-normal leading-[120%] xl:text-[16px] xl:font-medium 2xl:leading-none">
          {day}
        </p>
        <p className="text-[16px] font-medium leading-[120%] xl:text-[20px] 2xl:leading-[135%]">
          {date}
        </p>
      </div>

      <div
        className={clsx(
          "flex flex-1 flex-col items-center overflow-hidden text-center",
          "md:max-w-[241px] xl:max-w-[221px] 3xl:max-w-[354px]"
        )}
      >
        <p className="w-full truncate text-[14px] font-normal leading-[135%] md:text-[16px] md:font-medium xl:leading-[135%] 2xl:leading-[125%] 3xl:text-[20px]">
          {title}
        </p>
        <p className="text-[12px] font-normal leading-[125%] md:text-[14px] xl:leading-[135%] 2xl:leading-[125%] 3xl:text-[16px] 3xl:font-medium">
          {time}
        </p>
      </div>
    </button>
  );
};

export default CardSoon;
