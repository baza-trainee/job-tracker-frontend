import { FC} from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

export type VacancyCardProps = {
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
    const { t } = useTranslation();

    const locationLabel = {
        office: t("sortDropdown.office"),
        remote: t("sortDropdown.remote"),
        hybrid: t("sortDropdown.mixed"),
    }

    return (
        <div className={clsx(
            "shrink-0 border border-transparent box-border p-3 rounded-xl font-nunito font-medium flex flex-col justify-between gap-2 overflow-hidden transition-all duration-300 cursor-pointer active:border-iconHover focus:border-iconHover focus-visible:border-iconHover focus:outline-none", 
            colorSectionBG,
            colorHoverBG,
            "w-[241px] xl:w-[241px] 2xl:w-[278px] 3xl:w-[314px]"
            )}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
        >
            <div className="w-full text-start font-medium">
                <h3 className="text-base truncate">{titleVacancy}</h3>
                <p className="text-xs truncate">{company}</p>
            </div>
            <div className="flex gap-1 items-center font-medium">
                <Icon id={`location-${workType}`} className="w-6 h-6 shrink-0"/>
                <span className="text-sm">{locationLabel[workType]}</span>
                <span className="w-[50%] text-sm truncate">{location}</span>
            </div>
        </div>
    )
};

export default VacancyCard;
