import {
  DataItem,
  PropsModalAddProperties,
} from "@/components/modal/components/profileModals/modalAddProperties.types";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { useAppDispatch } from "@/store/hook";
import {
  useCreateCoverLeterMutation,
  useUpdateCoverLetterByIdMutation,
} from "@/store/querySlices/coverLettersQuerySlice";
import {
  useCreateSocialLinkMutation,
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
} from "@/store/querySlices/profileQuerySlice";
import {
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from "@/store/querySlices/projectQuerySlice";
import {
  useCreateResumeMutation,
  useUpdateResumeByIdMutation,
} from "@/store/querySlices/resumesQuerySlices";
import {
  closeModal,
  closeConfirmation,
  closeButton,
} from "@/store/slices/modalSlice/modalSlice";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
  isUpdating: boolean;
  cardsType: PropsModalAddProperties["cardsType"];
  updateItem: { id: string };
  errors: FieldErrors;
};

function useMutationProfileData({
  isUpdating,
  cardsType,
  updateItem,
  errors,
}: Props) {
  const { refetch: refetchProfile } = useGetAllUserDataQuery();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [
    mutationSocialLink,
    {
      isLoading: isLoadingSocialLink,
      isSuccess: isSuccessSocialLink,
      isError: isErrorSocialLink,
    },
  ] = isUpdating
    ? useUpdateSocialLinkMutation()
    : useCreateSocialLinkMutation();

  const [
    mutationCoverLetter,
    {
      isLoading: isLoadingCoverLetter,
      isSuccess: isSuccessCoverLetter,
      isError: isErrorCoverLetter,
    },
  ] = isUpdating
    ? useUpdateCoverLetterByIdMutation()
    : useCreateCoverLeterMutation();

  const [
    mutationProject,
    {
      isLoading: isLoadingProject,
      isSuccess: isSuccessProject,
      isError: isErrorProject,
    },
  ] = isUpdating ? useUpdateProjectByIdMutation() : useCreateProjectMutation();

  const [
    mutationResume,
    {
      isLoading: isLoadingResume,
      isSuccess: isSuccessResume,
      isError: isErrorResume,
    },
  ] = isUpdating ? useUpdateResumeByIdMutation() : useCreateResumeMutation();

  const onSubmit: SubmitHandler<
    Pick<DataItem, "text" | "link" | "name" | "technologies">
  > = async (data) => {
    switch (cardsType) {
      case "addPersonalProperties":
        await mutationSocialLink({
          name: data.name,
          link: data.link as string,
          idSocialLink: updateItem?.id,
        });
        break;

      case "addCoverLetters":
        await mutationCoverLetter({
          name: data.name,
          text: data.text as string,
          id: updateItem?.id,
        });
        break;

      case "addProjects":
        await mutationProject({
          id: updateItem?.id,
          name: data.name,
          technologies: data.technologies as string,
          link: data.link as string,
          description: data.text as string,
        });
        break;

      case "addResumes":
        await mutationResume({
          name: data.name,
          link: data.link as string,
          id: updateItem?.id,
        });
        break;

      default:
        break;
    }
  };

  const isSubmitDisabled =
    isLoadingCoverLetter ||
    isLoadingProject ||
    isLoadingResume ||
    isLoadingSocialLink ||
    Object.keys(errors).length > 0;

  const messageCreate: Record<PropsModalAddProperties["cardsType"], string> = {
    addPersonalProperties: t("notification.fieldAdded"),
    addCoverLetters: t("notification.letterAdded"),
    addProjects: t("notification.projectAdded"),
    addResumes: t("notification.resumeAdded"),
  };
  useEffect(() => {
    if (
      isSuccessCoverLetter ||
      isSuccessProject ||
      isSuccessResume ||
      isSuccessSocialLink
    ) {
      notifySuccess(
        isUpdating
          ? t("notification.updatedSuccess")
          : t(messageCreate[cardsType])
      );
      refetchProfile();
      dispatch(closeConfirmation());
      dispatch(closeModal());
      dispatch(closeButton({ isButtonOpen: false, resetForm: undefined }));
    }
  }, [
    isSuccessCoverLetter,
    isSuccessProject,
    isSuccessResume,
    isSuccessSocialLink,
  ]);

  useEffect(() => {
    if (
      isErrorCoverLetter ||
      isErrorProject ||
      isErrorResume ||
      isErrorSocialLink
    ) {
      notifyError(
        isUpdating
          ? t("notification.updatedError")
          : t("notification.addedError")
      );
    }
  }, [isErrorCoverLetter, isErrorProject, isErrorResume, isErrorSocialLink]);

  return { onSubmit, isSubmitDisabled };
}

export default useMutationProfileData;
