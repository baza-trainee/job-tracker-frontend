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
    hybrid: t("sortDropdown.mixed"),
  };

  return (
    <div
      className={clsx(
        "box-border flex shrink-0 cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-xl border border-transparent font-nunito font-medium",
        "px-2 py-3 xl:px-3",
        "transition-all duration-300 focus:border-iconHover focus:outline-none focus-visible:border-iconHover active:border-iconHover",
        colorSectionBG,
        colorHoverBG,
        "w-[232px] md:w-[200px] xl:w-[241px] 2xl:w-[278px] 3xl:w-[314px]"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="w-full text-start font-medium">
        <h3 className="truncate text-base">{titleVacancy}</h3>
        <p className="truncate text-xs">{company}</p>
      </div>
      <div className="flex items-center gap-1 font-medium">
        <Icon id={`location-${workType}`} className="h-6 w-6 shrink-0" />
        <span className="text-sm">{locationLabel[workType]}</span>
        <span className="w-[50%] truncate text-sm">{location}</span>
      </div>
    </div>
  );
};

export default VacancyCard;
