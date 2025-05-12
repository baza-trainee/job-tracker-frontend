import { useAppDispatch, useAppSelector } from "@/store/hook";

import {
  closeModal,
  closeConfirmation,
} from "@/store/slices/modalSlice/modalSlice";

import { useTranslation } from "react-i18next";
import { PropsModalAddProperties } from "./modalAddProperties.types";

import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";
import useRemoveProfileData from "@/components/Profile/hooks/useRemoveProfileData";

function ModalRemoveProperties({ cardsType }: PropsModalAddProperties) {
  // const idRemoveItem = useAppSelector((state) => state.modal.dataConfirmation);
  const {
    isModalOpen,
    isConfirmationOpen,
    isButtonOpen,
    dataConfirmation: idRemoveItem,
  } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleRemove, isDisabledButtonRemove } = useRemoveProfileData({
    cardsType,
    idRemoveItem,
  });

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
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="font-nunito text-[20px] font-bold leading-[135%] sm:text-[20px] md:text-[24px] xl:text-[32px]"> 
        {t("modalAddProperties.modalRemoveLinkTitle")}
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* <Button type="button" onClick={() => dispatch(closeModal())}> */}
        {/* alex */}
        <Button type="button" onClick={handleClose}>
          {t("infoModal.button.cancel")}
        </Button>

        <Button
          type="button"
          variant="accent"
          onClick={handleRemove}
          disabled={isDisabledButtonRemove}
          className="gap-3"
        >
          {t("infoModal.button.delete")}
          <Icon id="delete" className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

export default ModalRemoveProperties;
