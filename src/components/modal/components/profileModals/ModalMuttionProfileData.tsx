import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  useCreateCoverLeterMutation,
  useUpdateCoverLetterByIdMutation,
} from "@/store/querySlices/coverLettersQuerySlice";
import {
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from "@/store/querySlices/projectQuerySlice";
import {
  useCreateResumeMutation,
  useUpdateResumeByIdMutation,
} from "@/store/querySlices/resumesQuerySlices";

import {
  useCreateSocialLinkMutation,
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
} from "@/store/querySlices/profileQuerySlice";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { addProfileData } from "@/schemas/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useTranslation } from "react-i18next";

import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { Input } from "@/components/inputs/Input/Input";
import { Button } from "@/components/buttons/Button/Button";
import {
  DataItem,
  PropsModalAddProperties,
  useData,
} from "./modalAddProperties.types";
import Icon from "@/components/Icon/Icon";

function ModalMuttionProfileData({ cardsType }: PropsModalAddProperties) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<z.infer<(typeof addProfileData)[typeof cardsType]>>({
    resolver: zodResolver(addProfileData[cardsType]),
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { data } = useData();

  const { refetch: refetchProfile } = useGetAllUserDataQuery();

  const { t } = useTranslation();

  const updateItem =
    useAppSelector((state) => state.modal.dataConfirmation) || false;

  const isUpdating = Boolean(updateItem?.typeModal);

  useEffect(() => {
    if (!updateItem) return;
    setValue("name", updateItem.name || "");
    setValue("link", updateItem.link || "");
    setValue("technologies", updateItem.technologies || "");
    setValue("text", updateItem.description || updateItem.text);
  }, [updateItem]);

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

  useEffect(() => {
    if (
      isSuccessCoverLetter ||
      isSuccessProject ||
      isSuccessResume ||
      isSuccessSocialLink
    ) {
      notifySuccess("Дані збережено успішно");
      refetchProfile();
      dispatch(closeModal());
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
      notifyError("Дані не вдалося зберегти");
    }
  }, [isErrorCoverLetter, isErrorProject, isErrorResume, isErrorSocialLink]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        autoFocus
        label={data[cardsType].name}
        name="name"
        placeholder={data[cardsType].placeholderName}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />

      {data[cardsType].technologies && (
        <Input
          label={data[cardsType].technologies}
          name="technologies"
          placeholder={data[cardsType].placeholderTechnology as string}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      {data[cardsType].link && (
        <Input
          label={data[cardsType].link}
          name="link"
          placeholder={data[cardsType].placeholderLink}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      {data[cardsType].text && (
        <Input
          id="textCoverLetter"
          type="textarea"
          label={data[cardsType].text}
          name="text"
          placeholder={data[cardsType].placeholderLink}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      <div className="flex justify-center gap-5">
        <Button type="reset" onClick={() => dispatch(closeModal())}>
          {t("infoModal.button.cancel")}
        </Button>
        <Button
          type="submit"
          className="gap-3"
          variant="accent"
          disabled={isSubmitDisabled}
        >
          {t("infoModal.button.save")}
          <Icon id="check-box" className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
}

export default ModalMuttionProfileData;
