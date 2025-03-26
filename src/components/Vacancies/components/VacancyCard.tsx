import { FC } from "react";
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
    hybrid: t("sortDropdown.hybrid"),
  };

  return (
    <div
      className={clsx(
        "VacancyCard box-border flex shrink-0 cursor-pointer flex-col justify-between gap-2 rounded-xl",
        "overflow-hidden p-3 font-nunito font-medium",
        "transition-all duration-300 focus:border-iconHover focus:outline-none focus-visible:border-iconHover active:border-iconHover",
        colorSectionBG,
        colorHoverBG,
        // "w-[238px] md:w-[200px] xl:w-[241px] 2xl:w-[278px] 3xl:w-[314px]"
        "smPlus:w-[212px] w-[238px] md:w-[198.67px] xl:w-[239px] 2xl:w-[276px] 3xl:w-[312.8px]",
        {
          /* TEST Виправити мінімальну ширину!*/
        }
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="box-border w-full text-start font-medium">
        <h3 className="truncate text-[16px] leading-[135%]">{titleVacancy}</h3>
        <p className="truncate text-[12px] leading-[135%]">{company}</p>
      </div>
      <div className="box-border flex items-center gap-1 font-medium">
        <Icon id={`location-${workType}`} className="h-6 w-6 shrink-0" />
        <span className="text-[14px] leading-[135%]">
          {locationLabel[workType]}
        </span>
        <span className="w-[50%] truncate text-[14px] leading-[135%]">
          {location}
        </span>
      </div>
    </div>
  );
};

export default VacancyCard;
// border border-transparent
