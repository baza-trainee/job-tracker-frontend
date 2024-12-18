import { FC } from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancyCardFirstProps = {
    colorSectionBG: string;
};

const VacancyCardFirst: FC<VacancyCardFirstProps> = ({
    colorSectionBG,
}) => {

    return (
        <div className={clsx(
            "w-[278px] h-[94px] shrink-0 p-3 rounded-xl font-nunito font-medium flex items-center gap-2",
            colorSectionBG
        )}>
            <div className="pl-7">
                <Icon id="plus" className="w-6 h-6" />
            </div>
            <div className="w-full">
                <p className="text-base w-[154px]">Збережіть вашу першу вакансію</p>
            </div>
        </div>
    )
};

export default VacancyCardFirst;
