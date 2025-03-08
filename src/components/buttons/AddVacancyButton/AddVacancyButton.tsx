import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../store/hook";
import { openModal } from "../../../store/slices/modalSlice/modalSlice";
import Icon from "../../Icon/Icon";
import { createNewStatuses } from "../../../store/slices/statusVacancy/vacancyStatusSlice";
import { vacancyStatusesInfo } from "@/store/slices/statusVacancy/vacancyStatusOperation";

const AddVacancyButton = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  // alex
  return (
    <Button
      variant="accent"
      size="big"
      className="w-[280px] gap-3 md:w-auto"
      onClick={() => {
        dispatch(createNewStatuses(vacancyStatusesInfo));
        dispatch(
          openModal({
            typeModal: "addVacancy",
          })
        );
      }}
    >
      <span className="text-sm leading-[135%] md:text-xl">
        {t("vacanciesHeader.addVacancy")}
      </span>
      <Icon id={"plus"} className="size-6" />
    </Button>
  );
};
export default AddVacancyButton;
