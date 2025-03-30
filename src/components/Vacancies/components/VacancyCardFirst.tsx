import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

export type VacancyCardFirstProps = {
  colorSectionBG: string;
  colorHoverBG: string;
  onClick?: () => void;
};

const VacancyCardFirst: FC<VacancyCardFirstProps> = ({
  colorSectionBG,
  colorHoverBG,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <button
      className={clsx(
        "flex h-[94px] shrink-0 items-center gap-2 rounded-xl font-nunito font-medium",
        "px-2 py-3 xl:px-3",
        colorSectionBG,
        colorHoverBG,
        "w-[238px] smPlus:w-[212px] md:w-[198.67px] xl:w-[239px] 2xl:w-[276px] 3xl:w-[312.8px]"
      )}
      onClick={onClick}
    >
      <div className="pl-7">
        <Icon id="plus" className="h-6 w-6" />
      </div>
      <div className="w-full">
        <p className="w-[154px] text-base">{t("vacanciesHeader.cardFirst")}</p>
      </div>
    </button>
  );
};

export default VacancyCardFirst;
