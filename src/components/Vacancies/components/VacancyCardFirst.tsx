import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";
import { VacancyCardProps } from "./VacancyCard.tsx";

const VacancyCardFirst: FC<VacancyCardProps> = ({
    colorSectionBG, colorHoverBG, onClick
}) => {
    const { t } = useTranslation();

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
                <p className="text-base w-[154px]">{t("vacanciesHeader.cardFirst")}</p>
            </div>

        </button>
    )
};

export default VacancyCardFirst;
