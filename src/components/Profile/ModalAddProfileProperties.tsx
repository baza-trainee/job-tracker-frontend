import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { useCreateCoverLeterMutation } from "@/store/querySlices/coverLettersQuerySlice";
import { useCreateProjectMutation } from "@/store/querySlices/projectQuerySlice";
import { useCreateResumeMutation } from "@/store/querySlices/resumesQuerySlices";
import { useEffect } from "react";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { addProfileData } from "@/schemas/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hook";
import { DataItem, PropsModalAddProperties } from "./modalAddProperties.types";
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

function ModalAddProfileProperties({ cardsType }: PropsModalAddProperties) {
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
    createCoverLetter,
    {
      isLoading: isLoadingCoverLetter,
      isSuccess: isSuccessCreateCoverLetter,
      isError: isErrorCreateCoverLetter,
    },
  ] = useCreateCoverLeterMutation();

  const [
    createProject,
    {
      isLoading: isLoadingProject,
      isSuccess: isSuccessCreateProject,
      isError: isErrorCreateProject,
    },
  ] = useCreateProjectMutation();

  const [
    createResume,
    {
      isLoading: isLoadingResume,
      isSuccess: isSuccessCreateResume,
      isError: isErrorCreateResume,
    },
  ] = useCreateResumeMutation();

  const onSubmit: SubmitHandler<
    Pick<DataItem, "link" | "name" | "technology">
  > = async (data) => {
    switch (cardsType) {
      case "addCoverLetters":
        await createCoverLetter({
          name: data.name,
          text: data.link,
        });
        break;

      case "addProjects":
        await createProject({
          name: data.name,
          githubLink: data.technology || "",
          liveProjectLink: data.link,
        });
        break;

      case "addResumes":
        await createResume({
          name: data.name,
          link: data.link,
        });
        break;

      default:
        break;
    }
  };

  const isSubmitDisabled =
    (cardsType === "addCoverLetters" && isLoadingCoverLetter) ||
    (cardsType === "addProjects" && isLoadingProject) ||
    (cardsType === "addResumes" && isLoadingResume) ||
    (cardsType === "addPersonalProperties" && true) ||
    ((errors.link || errors.name || errors.technology) && true);

  useEffect(() => {
    if (
      isSuccessCreateCoverLetter ||
      isSuccessCreateProject ||
      isSuccessCreateResume
    ) {
      notifySuccess("Дані збережено успішно");
      refetchProfile();
      dispatch(closeModal());
    }
  }, [
    isSuccessCreateCoverLetter,
    isSuccessCreateProject,
    isSuccessCreateResume,
  ]);

  useEffect(() => {
    if (
      isErrorCreateCoverLetter ||
      isErrorCreateProject ||
      isErrorCreateResume
    ) {
      notifyError("Дані не вдалося зберегти");
    }
  }, [isErrorCreateCoverLetter, isErrorCreateProject, isErrorCreateResume]);

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

export default ModalAddProfileProperties;
