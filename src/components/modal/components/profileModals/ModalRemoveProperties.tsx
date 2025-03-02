import { useAppDispatch, useAppSelector } from "@/store/hook";

import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { useDeleteCoverLetterByIdMutation } from "@/store/querySlices/coverLettersQuerySlice";
import { useDeleteProjectByIdMutation } from "@/store/querySlices/projectQuerySlice";
import { useDeleteResumeByIdMutation } from "@/store/querySlices/resumesQuerySlices";
import { useEffect } from "react";

import {
  useDeleteSocialLinkMutation,
  useGetAllUserDataQuery,
} from "@/store/querySlices/profileQuerySlice";
import { useTranslation } from "react-i18next";
import { PropsModalAddProperties } from "./modalAddProperties.types";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";

function ModalRemoveProperties({ cardsType }: PropsModalAddProperties) {
  const idRemoveItem = useAppSelector((state) => state.modal.dataConfirmation);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { refetch: refetchProfile } = useGetAllUserDataQuery();

  const [
    removeSociallLink,
    {
      isError: isErrorRemoveSocialLink,
      isSuccess: isSuccessRemoveSocialLink,
      isLoading: isLoadingRemoveSocialLink,
    },
  ] = useDeleteSocialLinkMutation();

  const [
    removeCoverLetter,
    {
      isError: isErrorRemoveCoverLetter,
      isSuccess: isSuccessRemoveCoverLetter,
      isLoading: isLoadingRemoveCoverLetter,
    },
  ] = useDeleteCoverLetterByIdMutation();

  const [
    removeProject,
    {
      isError: isErrorRemoveProject,
      isSuccess: isSuccessRemoveProject,
      isLoading: isLoadingRemoveProject,
    },
  ] = useDeleteProjectByIdMutation();

  const [
    removeResume,
    {
      isError: isErrorRemoveResume,
      isSuccess: isSuccessRemoveResume,
      isLoading: isLoadingRemoveResume,
    },
  ] = useDeleteResumeByIdMutation();

  useEffect(() => {
    if (
      isErrorRemoveCoverLetter ||
      isErrorRemoveProject ||
      isErrorRemoveResume ||
      isErrorRemoveSocialLink
    ) {
      notifyError("Помилка видалення даних");
    }
  }, [
    isErrorRemoveCoverLetter,
    isErrorRemoveProject,
    isErrorRemoveSocialLink,
    isErrorRemoveResume,
  ]);

  useEffect(() => {
    if (
      isSuccessRemoveCoverLetter ||
      isSuccessRemoveProject ||
      isSuccessRemoveResume ||
      isSuccessRemoveSocialLink
    ) {
      notifySuccess("Дані видалено успішно");
      refetchProfile();
      dispatch(closeModal());
    }
  }, [
    isSuccessRemoveCoverLetter,
    isSuccessRemoveProject,
    isSuccessRemoveResume,
    isSuccessRemoveSocialLink,
  ]);

  const handleRemove = async () => {
    switch (cardsType) {
      case "addCoverLetters":
        await removeCoverLetter({ id: idRemoveItem });
        break;

      case "addPersonalProperties":
        await removeSociallLink({ idSocialLink: idRemoveItem });
        break;

      case "addProjects":
        await removeProject({ id: idRemoveItem });
        break;

      case "addResumes":
        await removeResume({ id: idRemoveItem });
        break;

      default:
        break;
    }
  };

  const isDisabledButtonRemove =
    isLoadingRemoveCoverLetter ||
    isLoadingRemoveProject ||
    isLoadingRemoveResume ||
    isLoadingRemoveSocialLink;

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="font-nunito text-[20px] font-bold leading-[135%] sm:text-[20px] md:text-[24px] xl:text-[32px]">
        {t("modalAddProperties.modalRemoveLinkTitle")}
      </h2>
      <div className="flex gap-4">
        <Button type="button" onClick={() => dispatch(closeModal())}>
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
