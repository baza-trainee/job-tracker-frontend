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
      className="mb-2 grid w-[480px] grid-cols-[1fr_3fr] gap-4 rounded-2xl bg-backgroundTertiary px-6 py-3"
      onClick={onClick}
    >
      <div className="flex w-[53px] flex-col items-center text-center">
        <p className="text-base">{day}</p>
        <p className="text-xl">{date}</p>
      </div>
      <div className="flex max-w-[339px] flex-col items-center text-center">
        <p className="w-full truncate text-xl">{title}</p>
        <p className="text-base">{time}</p>
      </div>
    </button>
  );
};

export default CardSoon;
