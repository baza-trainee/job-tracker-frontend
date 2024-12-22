import { FC } from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancyCardFirstProps = {
    colorSectionBG: string;
    colorHoverBG: string;
    onClick?: () => void;
};

const VacancyCardFirst: FC<VacancyCardFirstProps> = ({
    colorSectionBG, colorHoverBG, onClick
}) => {

    return (
        <button className={clsx(
            "w-[278px] h-[94px] shrink-0 p-3 rounded-xl font-nunito font-medium flex items-center gap-2",
            colorSectionBG,
            colorHoverBG
            )}
            onClick={onClick}
        >
            <div className="pl-7">
                <Icon id="plus" className="w-6 h-6" />
            </div>
            <div className="w-full">
                <p className="text-base w-[154px]">Збережіть вашу першу вакансію</p>
            </div>

        </button>
    )
};

export default VacancyCardFirst;
