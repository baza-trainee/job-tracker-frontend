import { SubmitHandler, useForm } from "react-hook-form";
import { AddVacancySchema } from "@/schemas/AddVacancySchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useArchiveVacancyByIdMutation,
  useCreateStatusVacancyByIdMutation,
  useUpdateVacancyByIdMutation,
  useDeleteStatusVacancyByIdMutation,
  useUpdateSpecificStatusVacancyByIdMutation,
} from "@/store/querySlices/vacanciesQuerySlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import {
  notifyError,
  notifySuccess,
} from "../../../Notifications/NotificationService";
import {
  closeConfirmation,
  closeModal,
} from "@/store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StatusName, RejectReason } from "@/types/vacancies.types";
import { useState, useEffect } from "react";
//alex
import { useDeleteVacancyByIdMutation } from "@/store/querySlices/vacanciesQuerySlice";

const useEditVacancy = () => {
  const { refetch } = useGetAllUserDataQuery();
  const [updateVacancyById] = useUpdateVacancyByIdMutation();

  const [createStatusVacancyById] = useCreateStatusVacancyByIdMutation();
  const [deleteStatusVacancyById] = useDeleteStatusVacancyByIdMutation();
  const [updateSpecificStatusVacancyById] =
    useUpdateSpecificStatusVacancyByIdMutation();

  const [archiveVacancyById] = useArchiveVacancyByIdMutation();
  const dispatch = useAppDispatch();
  const { previousStatuses, newStatuses } = useAppSelector(
    (state) => state.statusVacancy
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { vacancyData } = useAppSelector((state) => state.modal);

  const {
    register,
    resetField,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof AddVacancySchema>>({
    defaultValues: {
      company: "",
      vacancy: "",
      link: "",
      communication: "",
      location: "",
      note: "",
      work_type: "office",
      isArchived: false,

      resume: false,
      reject: false,
      resumeDropdown: "",
      rejectDropdown: "",
    },
    resolver: zodResolver(AddVacancySchema),
    mode: "onBlur",
  });

  //alex
  useEffect(() => {
    if (vacancyData) {
      const findStatusId = (statusName: string) => {
        return (
          vacancyData.statuses.find((item) => item.name === statusName)
            ?.resumeId || ""
        );
      };

      reset({
        company: vacancyData.company,
        vacancy: vacancyData.vacancy,
        link: vacancyData.link,
        communication: vacancyData.communication,
        location: vacancyData.location,
        note: vacancyData.note,
        work_type: vacancyData.work_type,
        isArchived: vacancyData.isArchived,
        resumeDropdown: findStatusId("resume"),
        rejectDropdown: findStatusId("reject"),
      });
    }
  }, [vacancyData, reset, dispatch]);

  // deleteVacancy
  const [deleteVacancyById] = useDeleteVacancyByIdMutation();

  const deleteVacancy = async () => {
    try {
      setIsLoading(true);
      await deleteVacancyById({ id: vacancyData?.id as string }).unwrap();
      refetch();
      reset();
      notifySuccess("Вакансію успішно видалено. Дякую");
    } catch (err) {
      console.log(err);
      notifyError("Виникла помилка. Вакансію не видалено");
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
    dispatch(closeModal());
  };

  //-----------------------------------------------------

  const onSubmit: SubmitHandler<z.infer<typeof AddVacancySchema>> = async (
    data
  ) => {
    try {
      const {
        company,
        vacancy,
        link,
        communication,
        location,
        note,
        work_type,
        isArchived,
      } = data;
      setIsLoading(true);
      console.log("редагування вакансії 55", data);

      // 1 - запит на збереження вакансії - пропускаємо

      // 2 - id вакансії для подальших запитів
      const idVacancy = vacancyData?.id || "";

      // 3 - запит на збереження вакансії після редагування
      const response = await updateVacancyById({
        id: idVacancy,
        company,
        vacancy,
        link,
        communication,
        location,
        note,
        work_type,
      }).unwrap();
      console.log("Збереження редагованої вакансії", response);

      // 3 - архівуємо
      if (isArchived) {
        const responseArhive = await archiveVacancyById({
          id: idVacancy,
        }).unwrap();
        console.log("responseArhive", responseArhive);
      }

      // 4 - зберігаємо статуси
      console.log("prev Status", previousStatuses);
      console.log("new Status", newStatuses);

      for (let i: number = 0; i <= newStatuses.length; i++) {
        const prevDate = previousStatuses[i]?.date || "";
        const newDate = newStatuses[i]?.date || "";
        if (prevDate !== newDate) {
          // створити статус
          if (prevDate === "1970-01-01T00:00:00.000Z") {
            console.log("start create status");

            const statusResponse = await createStatusVacancyById({
              vacancyId: idVacancy,
              name: newStatuses[i].name as StatusName,
              date: newStatuses[i].date || "",
              resumeId: newStatuses[i].resumeId,
              rejectReason: newStatuses[i].rejectReason as RejectReason,
            }).unwrap();
            console.log("Створення статусу", statusResponse);
          }
          // видалити статус
          if (newDate === "1970-01-01T00:00:00.000Z") {
            const statusResponse = await deleteStatusVacancyById({
              vacancyId: idVacancy,
              id: newStatuses[i].id,
            }).unwrap();
            console.log("Видалення статусу", statusResponse);
          }
          // редагувати статус
          if (
            prevDate !== "1970-01-01T00:00:00.000Z" &&
            newDate !== "1970-01-01T00:00:00.000Z"
          ) {
            const statusResponse = await updateSpecificStatusVacancyById({
              vacancyId: idVacancy,
              id: newStatuses[i].id,
              name: newStatuses[i].name as StatusName,
              date: newStatuses[i].date || "",
              resumeId: newStatuses[i].resumeId,
              rejectReason: newStatuses[i].rejectReason as RejectReason,
            }).unwrap();
            console.log("Редагування статусу", statusResponse);
          }
        }
      }

      refetch();
      reset();
      notifySuccess("Дані успішно збережено. Дякую");
    } catch (error) {
      notifyError("Дані не збережено. Спробуйте ще раз");
      console.error(error);
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
    dispatch(closeModal());
  };

  return {
    register,
    resetField,
    reset,
    handleSubmit,
    getValues,
    setValue,
    errors,
    onSubmit,
    isLoading,
    vacancyData,
    deleteVacancy,
  };
};

export default useEditVacancy;
