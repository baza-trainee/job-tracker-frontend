import { SubmitHandler, useForm } from "react-hook-form";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateVacancyMutation,
  useArchiveVacancyByIdMutation,
  useCreateStatusVacancyByIdMutation,
} from "../../../../store/querySlices/vacanciesQuerySlice";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import {
  notifyError,
  notifySuccess,
} from "../../../Notifications/NotificationService";
import {
  closeConfirmation,
  closeModal,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { StatusName, RejectReason } from "../../../../types/vacancies.types";

const useVacancy = () => {
  const { refetch } = useGetAllUserDataQuery();
  const [createVacancy] = useCreateVacancyMutation();
  const [archiveVacancyById] = useArchiveVacancyByIdMutation();
  const [createStatusVacancyById] = useCreateStatusVacancyByIdMutation();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.statusVacancy.newStatuses);

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

      resumeDropdown: "",
      rejectionDropdown: "",
    },
    resolver: zodResolver(AddVacancySchema),
    mode: "onBlur",
  });

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

      // 1 - запит на збереження вакансії
      const response = await createVacancy({
        company,
        vacancy,
        link,
        communication,
        location,
        note,
        work_type,
      }).unwrap();

      // 2 - id вакансії для подальших запитів
      const idVacancy = response.id;

      // 3 - архівуємо
      if (isArchived) {
        const responseArhive = await archiveVacancyById({
          id: idVacancy,
        }).unwrap();
        console.log("responseArhive", responseArhive);
      }

      // 4 - зберігаємо статуси
      for (const elem of status) {
        if (elem.date !== "1970-01-01T00:00:00.000Z") {
          console.log("status", elem);
          const statusResponse = await createStatusVacancyById({
            vacancyId: idVacancy,
            name: elem.name as StatusName,
            date: elem.date || "",
            resumeId: elem.resumeId,
            rejectReason: elem.rejectReason as RejectReason,
          }).unwrap();
          console.log("statusResponse", statusResponse);
        }
      }
      refetch();
      reset();
    } catch (error) {
      notifyError("Дані не збережено. Спробуйте ЩЕ");
      console.log(error);
    }
    notifySuccess("Дані успішно збережено. Дякую");
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
  };
};

export default useVacancy;
