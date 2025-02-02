import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { useUpdateCoverLetterByIdMutation } from "@/store/querySlices/coverLettersQuerySlice";
import { useUpdateProjectByIdMutation } from "@/store/querySlices/projectQuerySlice";
import { useUpdateResumeByIdMutation } from "@/store/querySlices/resumesQuerySlices";
import { useEffect } from "react";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";
import {
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
} from "@/store/querySlices/profileQuerySlice";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { addProfileData } from "@/schemas/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hook";
import {
  DataItem,
  DataUpdateItem,
  PropsModalAddProperties,
} from "./modalAddProperties.types";
// import useProfileTexts from "./textProfile/useProfileText";

const data: {
  [K in PropsModalAddProperties["cardsType"]]: DataItem;
} = {
  addPersonalProperties: {
    name: "Назва",
    placeholderName: "Вкажіть назву посилання",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на посилання",
  },
  addProjects: {
    name: "Назва",
    placeholderName: "Вкажіть назву проєкту",
    technology: "Технолігії",
    placeholderTechnology: "Вкажіть технологій які використовували",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на проєкт",
  },
  addResumes: {
    name: "Назва",
    placeholderName: "Вкажіть назву резюме",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на резюме",
  },
  addCoverLetters: {
    name: "Назва",
    placeholderName: "Вкажіть назву для листа",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на супровідний лист",
  },
};

export default function ModalUpdateProfileProperties({
  cardsType,
}: PropsModalAddProperties) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<z.infer<(typeof addProfileData)[typeof cardsType]>>({
    resolver: zodResolver(addProfileData[cardsType]),
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { refetch: refetchProfile } = useGetAllUserDataQuery();
  // const text = useProfileTexts({ cardsType });

  const [
    updateSocialLink,
    {
      isLoading: isLoadingUpdateSocialLink,
      isSuccess: isSuccessUpdateSocialLink,
      isError: isErrorUpdateSocialLink,
    },
  ] = useUpdateSocialLinkMutation();

  const [
    updateCoverLetter,
    {
      isLoading: isLoadingUpdateCoverLetter,
      isSuccess: isSuccessUpdateCoverLetter,
      isError: isErrorUpdateCoverLetter,
    },
  ] = useUpdateCoverLetterByIdMutation();

  const [
    updateProject,
    {
      isLoading: isLoadingUpdateProject,
      isSuccess: isSuccessUpdateProject,
      isError: isErrorUpdateProject,
    },
  ] = useUpdateProjectByIdMutation();

  const [
    updateResume,
    {
      isLoading: isLoadingUpdateResume,
      isSuccess: isSuccessUpdateResume,
      isError: isErrorUpdateResume,
    },
  ] = useUpdateResumeByIdMutation();

  const onSubmit: SubmitHandler<
    Pick<DataUpdateItem, "id" | "link" | "name" | "technology">
  > = async (data) => {
    switch (cardsType) {
      case "addPersonalProperties":
        await updateSocialLink({
          name: data.name,
          link: data.link,
          idSocialLink: data.id as string,
        });
        break;

      case "addCoverLetters":
        await updateCoverLetter({
          id: data.id as string,
          name: data.name,
          text: data.link,
        });
        break;

      case "addProjects":
        await updateProject({
          id: data.id as string,
          name: data.name,
          githubLink: data.technology || "",
          liveProjectLink: data.link,
        });
        break;

      case "addResumes":
        await updateResume({
          id: data.id as string,
          name: data.name,
          link: data.link,
        });
        break;

      default:
        break;
    }
  };

  const isSubmitDisabled =
    (cardsType === "addCoverLetters" && isLoadingUpdateCoverLetter) ||
    (cardsType === "addProjects" && isLoadingUpdateProject) ||
    (cardsType === "addResumes" && isLoadingUpdateResume) ||
    (cardsType === "addPersonalProperties" && isLoadingUpdateSocialLink) ||
    ((errors.link || errors.name || errors.technology) && true);

  useEffect(() => {
    if (
      isSuccessUpdateCoverLetter ||
      isSuccessUpdateProject ||
      isSuccessUpdateResume ||
      isSuccessUpdateSocialLink
    ) {
      notifySuccess("Дані оновлено успішно");
      refetchProfile();
      dispatch(closeModal());
    }
  }, [
    isSuccessUpdateCoverLetter,
    isSuccessUpdateProject,
    isSuccessUpdateResume,
    isSuccessUpdateSocialLink,
  ]);

  useEffect(() => {
    if (
      isErrorUpdateCoverLetter ||
      isErrorUpdateProject ||
      isErrorUpdateResume ||
      isErrorUpdateSocialLink
    ) {
      notifyError("Дані не вдалося оновити");
    }
  }, [
    isErrorUpdateCoverLetter,
    isErrorUpdateProject,
    isErrorUpdateResume,
    isErrorUpdateSocialLink,
  ]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={data[cardsType].name}
        name="name"
        placeholder={data[cardsType].placeholderName}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />
      {data[cardsType].technology && (
        <Input
          label={data[cardsType].technology}
          name="technology"
          placeholder={data[cardsType].placeholderTechnology as string}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      <Input
        label={data[cardsType].link}
        name="link"
        placeholder={data[cardsType].placeholderLink}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />
      <div className="flex justify-center gap-5">
        <Button type="reset" onClick={() => dispatch(closeModal())}>
          Скасувати
        </Button>
        <Button type="submit" variant="accent" disabled={isSubmitDisabled}>
          Зберегти
        </Button>
      </div>
    </form>
  );
}
