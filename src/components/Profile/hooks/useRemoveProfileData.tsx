import { PropsModalAddProperties } from "@/components/modal/components/profileModals/modalAddProperties.types";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { useAppDispatch } from "@/store/hook";
import { useDeleteCoverLetterByIdMutation } from "@/store/querySlices/coverLettersQuerySlice";
import {
  useDeleteSocialLinkMutation,
  useGetAllUserDataQuery,
} from "@/store/querySlices/profileQuerySlice";
import { useDeleteProjectByIdMutation } from "@/store/querySlices/projectQuerySlice";
import { useDeleteResumeByIdMutation } from "@/store/querySlices/resumesQuerySlices";
import {
  closeModal,
  closeConfirmation,
  closeButton,
} from "@/store/slices/modalSlice/modalSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  cardsType: PropsModalAddProperties["cardsType"];
  idRemoveItem: string;
  shoudCloseModal?: boolean;
};

function useRemoveProfileData({
  cardsType,
  idRemoveItem,
  shoudCloseModal = true,
}: Props) {
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
      notifyError(t(`notification.deletedError`));
    }
  }, [
    isErrorRemoveCoverLetter,
    isErrorRemoveProject,
    isErrorRemoveSocialLink,
    isErrorRemoveResume,
  ]);
  const messageMap: Record<PropsModalAddProperties["cardsType"], string> = {
    addPersonalProperties: t("notification.fieldDeleted"),
    addCoverLetters: t("notification.letterDeleted"),
    addProjects: t("notification.projectDeleted"),
    addResumes: t("notification.resumeDeleted"),
  };
  useEffect(() => {
    if (
      isSuccessRemoveCoverLetter ||
      isSuccessRemoveProject ||
      isSuccessRemoveResume ||
      isSuccessRemoveSocialLink
    ) {
      notifySuccess(messageMap[cardsType] || "");
      refetchProfile();
      if (shoudCloseModal) {
        dispatch(closeConfirmation());
        dispatch(closeModal());
        dispatch(closeButton({ isButtonOpen: false, resetForm: undefined }));
      }
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
  return { handleRemove, isDisabledButtonRemove };
}

export default useRemoveProfileData;
