import { useAppDispatch, useAppSelector } from "@/store/hook";

import {
  closeModal,
  closeConfirmation,
} from "@/store/slices/modalSlice/modalSlice";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";
import useMutationProfileData from "@/components/Profile/hooks/useMutationProfileData";

type PropsModalAddProperties = {
  cardsType:
    | "updateResumes"
    | "updateProjects"
    | "updateCoverLetters"
    | "updatePersonalProperties";
};

function ModalAddProperties({ cardsType }: PropsModalAddProperties) {
  const { isModalOpen, isConfirmationOpen, isButtonOpen, dataConfirmation } =
    useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const updateItem =
    useAppSelector((state) => state.modal.profileData) || false;

  const errors = {};

  const isUpdating = Boolean(updateItem?.typeModal);
  const typeConfirmationAdd: string = "add" + cardsType.slice(6);
  const { onSubmit, isSubmitDisabled } = useMutationProfileData({
    isUpdating,
    cardsType: typeConfirmationAdd as
      | "addResumes"
      | "addProjects"
      | "addCoverLetters"
      | "addPersonalProperties",
    updateItem,
    errors,
  });

  const handleSubmit = () => {
    onSubmit(dataConfirmation);
  };

  // alex
  const handleClose = (): void => {
    if (!isConfirmationOpen) {
      dispatch(closeModal());
    }
    if (isConfirmationOpen) {
      dispatch(closeConfirmation());
    }
    if (isModalOpen && isButtonOpen) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-7">
      <h4 className="mb-3 font-nunito font-bold leading-[135%] sm:text-[20px] md:text-[24px] xl:text-[32px]">
        {t("infoModal.saveAddVacancies.title")}
      </h4>
      <div className="mb-8 text-center font-nunito font-medium leading-[135%] sm:text-[14px] md:text-[14px] xl:text-[20px]">
        {t("infoModal.saveAddVacancies.text_1")}
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row justify-center">
        <Button type="button" onClick={handleClose}>
          {t("infoModal.button.cancel")}
        </Button>

        <Button
          type="button"
          variant="accent"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="gap-3"
        >
          {t("infoModal.button.save")}
          <Icon id="check-box" className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

export default ModalAddProperties;
