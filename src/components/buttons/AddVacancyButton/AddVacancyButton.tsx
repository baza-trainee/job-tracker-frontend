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
      className="gap-3"
      onClick={() => {
        dispatch(createNewStatuses(vacancyStatusesInfo));
        dispatch(
          openModal({
            typeModal: "addVacancy",
          })
        );
      }}
    >
      <span className="w-[130px] text-base leading-[135%]">
        {t("vacanciesHeader.addVacancy")}
      </span>
      <Icon id={"plus"} className="h-6 w-6" />
    </Button>
  );
};
export default AddVacancyButton;
