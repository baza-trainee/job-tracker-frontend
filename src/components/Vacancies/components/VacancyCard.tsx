import { FC} from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancyCardProps = {
    colorSectionBG: string;
    colorHoverBG: string;
    titleVacancy: string;
    company: string;
    location: string;
    workType: "office" | "remote" | "hybrid";
    onClick?: () => void;
};

const VacancyCard: FC<VacancyCardProps> = ({ 
    colorSectionBG,
    colorHoverBG,
    titleVacancy, 
    company, 
    location, 
    workType,
    onClick, 
}) => {
    const locationLabel = {
        office: "Офіс",
        remote: "Дистанційно",
        hybrid: "Змішаний",
    }

    return (
        <button className={clsx(
            "w-[278px] shrink-0 p-3 rounded-xl font-nunito font-medium flex flex-col justify-between gap-2", 
            colorSectionBG,
            colorHoverBG
            )}
            onClick={onClick}
        >
            <div className="w-full text-start">
                <h3 className="text-base truncate">{titleVacancy}</h3>
                <p className="text-xs truncate">{company}</p>
            </div>
            <div className="flex gap-1 items-center">
                <Icon id={`location-${workType}`} className="w-6 h-6"/>
                <span className="text-sm">{locationLabel[workType]}</span>
                <span className="w-[50%] text-sm truncate">{location}</span>
            </div>
        </button>
    )
};

export default VacancyCard;


// Додаткові стилі:

// Додав ефекти при ховері та кліку: 
// hover:scale-[1.02] (легке збільшення) 
// active:scale-[0.98] (зменшення при натисканні).

// Додав focus:outline-none та focus:ring для кращої доступності.

// "w-[278px] shrink-0 p-3 rounded-xl font-nunito font-medium flex flex-col justify-between gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",