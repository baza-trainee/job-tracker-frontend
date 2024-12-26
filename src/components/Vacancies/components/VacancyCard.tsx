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
            "w-[278px] shrink-0 border border-transparent box-border p-3 rounded-xl font-nunito font-medium flex flex-col justify-between gap-2 overflow-hidden transition-all duration-300 active:border-iconHover focus:border-iconHover focus-visible:border-iconHover focus:outline-none", 
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
