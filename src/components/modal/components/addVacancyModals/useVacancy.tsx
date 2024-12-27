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
import { useAppDispatch } from "../../../../store/hook";

const useVacancy = () => {
  //   const { refetch } = useGetAllUserDataQuery();
  //   const [createVacancy] = useCreateVacancyMutation();
  const dispatch = useAppDispatch();

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
      sendSummary: false,

      HR: false,

      testTask: false,
      technicalInterview: false,
      rejection: false,
      offer: false,

      sendSummaryCalendar: "",

      HRCalendar: "",

      testTaskCalendar: "",
      technicalInterviewCalendar: "",
      rejectionCalendar: "",
      offerCalendar: "",
    },
    resolver: zodResolver(AddVacancySchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<z.infer<typeof AddVacancySchema>> = async (
    data
  ) => {
    console.log("data Backend", data);

    notifySuccess("Дані успішно збережено. Дякую");
    dispatch(closeConfirmation());
    dispatch(closeModal());
    // try {
    //   const response = await createVacancy(data).unwrap();
    //   console.log(response);

    //   refetch();
    //   reset();
    // } catch (error) {
    //   console.log(error);
    // }
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
