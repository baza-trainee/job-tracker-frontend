import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../store/hook";
import { openModal } from "../../../store/slices/modalSlice/modalSlice";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils/utils";
import { TypesModal } from "@/components/modal/ModalMain.types";
import { useTranslation } from "react-i18next";
import { createNewStatuses } from "@/store/slices/statusVacancy/vacancyStatusSlice";
import { vacancyStatusesInfo } from "@/store/slices/statusVacancy/vacancyStatusOperation";

interface AddButtonProps {
  className?: string;
  variant: "vacancy" | "note";
}

const AddButton: React.FC<AddButtonProps> = ({ className, variant }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  let modalType: TypesModal;
  let onClick: () => void;
  let buttonText = "";

  switch (variant) {
    case "vacancy":
      modalType = "addVacancy";
      buttonText = t("vacanciesHeader.addVacancy");
      onClick = () => dispatch(createNewStatuses(vacancyStatusesInfo));

      break;
    case "note":
      modalType = "addVacancy";
      buttonText = t("vacanciesHeader.addVacancy");
      onClick = () => dispatch(createNewStatuses(vacancyStatusesInfo));
      break;

    default:
      console.log("default");
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    dispatch(
      openModal({
        typeModal: modalType,
      })
    );
  };

  return (
    <Button
      variant="accent"
      size="big"
      className={cn("h-[50px] w-[280px] gap-[10px] md:w-auto", className)}
      onClick={handleClick}
    >
      <span className="w-[125px] text-nowrap text-sm leading-[135%] md:text-base">
        {buttonText}
      </span>
      <Icon id="plus" className="size-6" />
    </Button>
  );
};

export default AddButton;
