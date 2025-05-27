import { FC } from "react";
import { useAppDispatch } from "../../../store/hook.ts";
import { useTranslation } from "react-i18next";
import { openModal } from "../../../store/slices/modalSlice/modalSlice.ts";
import { createNewStatuses } from "@/store/slices/statusVacancy/vacancyStatusSlice";
import { vacancyStatusesInfo } from "@/store/slices/statusVacancy/vacancyStatusOperation";
import { TypesModal } from "../../modal/ModalMain.types.ts";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

export type VacancyCardFirstProps = {
  colorSectionBG: string;
  colorHoverBG: string;
  onClick?: () => void;
  typeModal: TypesModal;
};

const VacancyCardFirst: FC<VacancyCardFirstProps> = ({
  colorSectionBG,
  colorHoverBG,
  onClick,
  typeModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    dispatch(createNewStatuses(vacancyStatusesInfo));

    dispatch(
      openModal({
        typeModal: typeModal,
      })
    );
  };

  return (
    <button
      className={clsx(
        "flex h-[94px] shrink-0 items-center gap-2 rounded-xl font-nunito font-medium",
        "px-2 py-3 xl:px-3",
        colorSectionBG,
        colorHoverBG,
        "w-[238px] smPlus:w-[212px] md:w-[198.67px] xl:w-[239px] 2xl:w-[276px] 3xl:w-[312.8px]"
      )}
      onClick={handleClick}
    >
      <div className="pl-[10px] xl:pl-7">
        <Icon id="plus" className="h-6 w-6 fill-textBlack" />
      </div>
      <div className="w-full">
        <p className="w-[135px] text-start text-base smPlus:w-full xl:w-[154px]">
          {t("vacanciesHeader.cardFirst")}
        </p>
      </div>
    </button>
  );
};

export default VacancyCardFirst;
