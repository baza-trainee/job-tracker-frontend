import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../store/hook";
import { openModal } from "../../../store/slices/modalSlice/modalSlice";
import Icon from "../../Icon/Icon";
import { createNewStatuses } from "../../../store/slices/statusVacancy/vacancyStatusSlice";
import { vacancyStatusesInfo } from "@/store/slices/statusVacancy/vacancyStatusOperation";
import { cn } from "@/utils/utils";

const AddVacancyButton = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  // alex
  return (
    <Button
      variant="accent"
      size="big"
      className={cn("w-[280px] gap-[10px] md:w-auto", className)}
      onClick={() => {
        dispatch(createNewStatuses(vacancyStatusesInfo));
        dispatch(
          openModal({
            typeModal: "addVacancy",
          })
        );
      }}
    >
      <span className="w-[125px] text-nowrap text-sm leading-[135%] md:text-base">
        {t("vacanciesHeader.addVacancy")}
      </span>
      <Icon id={"plus"} className="size-6" />
    </Button>
  );
};
export default AddVacancyButton;
