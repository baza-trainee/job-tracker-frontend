type CardSoonProps = {
    day: string;
    date: string;
    title: string;
    time: string;
}

const CardSoon: React.FC<CardSoonProps> = ({ day, date, title, time }) => {
    return (
        <div className="grid grid-cols-[1fr_3fr] gap-4 border border-gray-300 rounded-2xl p-4 mb-4 bg-backgroundTertiary">
            <div className="flex flex-col text-center items-center">
                <p className="text-lg">{day}</p>
                <p className="text-xl">{date}</p>
            </div>
            <div className="flex flex-col text-center items-center">
                <p className="text-xl">{title}</p>
                <p className="text-base">{time}</p>
            </div>
        </div>
    );
};

export default CardSoon;
