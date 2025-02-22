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
        "grid w-full grid-cols-[17%_3fr] rounded-2xl bg-backgroundTertiary hover:bg-backgroundSecondary",
        "px-2 py-3 xl:px-4 xl:py-2 3xl:px-6",
        "gap-2 3xl:gap-4",
        "mb-2 xl:mb-3"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-[14px] font-normal leading-[135%] xl:text-[16px] xl:font-medium">
          {day}
        </p>
        <p className="text-[16px] font-medium leading-[135%] xl:text-[20px] 3xl:text-xl">
          {date}
        </p>
      </div>

      <div
        className={clsx(
          "flex flex-col items-center text-center",
          "max-w-[203px] md:max-w-[249px] 3xl:max-w-[339px]"
        )}
      >
        <p className="w-full truncate text-[14px] font-normal leading-[135%] md:text-[16px] md:font-medium 3xl:text-[20px]">
          {title}
        </p>
        <p className="text-[12px] font-normal leading-[135%] md:text-[14px] 3xl:text-[16px] 3xl:font-medium">
          {time}
        </p>
      </div>
    </button>
  );
};

export default CardSoon;
