type CardSoonProps = {
    day: string;
    date: string;
    title: string;
    time: string;
}

const CardSoon: React.FC<CardSoonProps> = ({ day, date, title, time }) => {
    return (
        <div className="w-[480px] grid grid-cols-[1fr_3fr] gap-4 rounded-2xl py-3 px-6 mb-2 bg-backgroundTertiary">
            <div className="w-[53px] flex flex-col text-center items-center">
                <p className="text-base">{day}</p>
                <p className="text-xl">{date}</p>
            </div>
            <div className="max-w-[339px] flex flex-col text-center items-center">
                <p className="text-xl w-full truncate">{title}</p>
                <p className="text-base">{time}</p>
            </div>
        </div>
    );
};

export default CardSoon;
// truncate