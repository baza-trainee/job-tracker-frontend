import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../store/hook";
import { openModal } from "../../../store/slices/modalSlice/modalSlice";
import Icon from "../../Icon/Icon";
import { createNewStatuses } from "../../../store/slices/statusVacancy/vacancyStatusSlice";

const AddVacancyButton = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  // alex
  return (
    <Button
      variant="accent"
      size="big"
      onClick={() => {
        dispatch(
          openModal({
            typeModal: "addVacancy",
          })
        );
        // alex -- добавить функцию
        dispatch(createNewStatuses());
      }}
    >
      <div className="flex items-center gap-3">
        <span className="w-[130px] text-base leading-[135%]">
          {t("vacanciesHeader.addVacancy")}
        </span>
        <Icon id={"plus"} className="h-6 w-6" />
      </div>
    </Button>
  );
};
export default AddVacancyButton;
