import { SubmitHandler, useForm } from "react-hook-form";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreateVacancyMutation } from "../../../../store/querySlices/vacanciesQuerySlice";
// import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import { notifySuccess } from "../../../Notifications/NotificationService";
import {
  closeConfirmation,
  closeModal,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";

const useVacancy = () => {
  //   const { refetch } = useGetAllUserDataQuery();
  //   const [createVacancy] = useCreateVacancyMutation();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.statusVacancy.statuses);

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
    },
    resolver: zodResolver(AddVacancySchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<z.infer<typeof AddVacancySchema>> = async (
    data
  ) => {
    const statusData = status.filter(
      (elem) => elem.date !== "1970-01-01T00:00:00.000Z"
    );
    console.log("data Backend", {
      ...data,
      statuses: [...statusData],
    });

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
