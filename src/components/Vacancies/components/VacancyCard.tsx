import { FC} from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancyCardProps = {
    colorSectionBG: string;
    titleVacancy: string;
    company: string;
    locationType: "office" | "remote" | "hybrid";
};

const VacancyCard: FC<VacancyCardProps> = ({ 
    colorSectionBG,
    titleVacancy, 
    company, 
    locationType 
}) => {
    const locationLabel = {
        office: "Офіс",
        remote: "Дистанційно",
        hybrid: "Змішано",
    }

    return (
        <div className={clsx(
            "w-[278px] p-3 rounded-xl font-nunito font-medium flex flex-col justify-between gap-2", 
            colorSectionBG
        )}>
            <div>
                <h3 className="text-base">{titleVacancy}</h3>
                <p className="text-xs">{company}</p>
            </div>
            <div className="flex gap-1 items-center">
                <Icon id={`location-${locationType}`} className="w-6 h-6"/>
                <span className="text-sm">{locationLabel[locationType]}</span>
            </div>
        </div>
    )
};

export default VacancyCard;