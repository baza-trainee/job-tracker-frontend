import { FC} from "react";
import clsx from "clsx";
import Icon from "../Icon/Icon.tsx";
// import { addOpacityToHex } from "../../utils/colorUtils.ts";

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

    // const cardColorBG = addOpacityToHex(colorSectionBG, 0.4);

    return (
        <div className={clsx("w-[278px] p-3 rounded-xl", colorSectionBG)}>
            <h3 className="">{titleVacancy} titleVacancy</h3>
            <p className="">{company} company</p>
            <div className="flex">
                <Icon id={`location-${locationType}`} className="w-4 h-4"/>
                <span>{locationLabel[locationType]}</span>
            </div>
        </div>
    )
};

export default VacancyCard;
