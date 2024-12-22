import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
import { t } from "i18next";
import Checkbox from "../../../checkbox/Checkbox";
import Icon from "../../../Icon/Icon";
import { useCreateVacancyMutation } from "../../../../store/slices/vacanciesQuerySlice/vacanciesQuerySlice";
import { useGetAllUserDataQuery } from "../../../../store/slices/profileQuerySlice/profileQuerySlice";

//alex
// import { useAppDispatch } from "../../../../store/hook";
// import { openConfirmation } from "../../../../store/slices/modalSlice/modalSlice";

const AddVacancy = () => {
  const { refetch } = useGetAllUserDataQuery({});
  const [createVacancy] = useCreateVacancyMutation();
  // const dispatch = useAppDispatch();

  // const handleModal = () => {
  //   dispatch(
  //     openConfirmation({
  //       typeConfirmation: "saveChangesVacancies",
  //     })
  //   );
  // };

  const {
    register,
    resetField,
    reset,
    handleSubmit,
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
    try {
      await createVacancy(data).unwrap();
      refetch();
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitArchive = () => {
    setValue("isArchived", true);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-6">
            <div className="flex w-[445px] flex-col justify-between gap-6">
              <div className="flex flex-col gap-5">
                <Input
                  register={register}
                  resetField={resetField}
                  key="company"
                  name="company"
                  placeholder={t("addVacancy.placeholders.company")}
                  type="text"
                  className=""
                  label={t("addVacancy.form.company")}
                  errors={errors}
                />
                <Input
                  register={register}
                  resetField={resetField}
                  key="vacancy"
                  name="vacancy"
                  placeholder={t("addVacancy.placeholders.position")}
                  type="text"
                  className=""
                  label={t("addVacancy.form.position")}
                  errors={errors}
                />
                <Input
                  register={register}
                  resetField={resetField}
                  key="link"
                  name="link"
                  placeholder={t("addVacancy.placeholders.link")}
                  type="text"
                  className=""
                  label={t("addVacancy.form.link")}
                  errors={errors}
                />
                <Input
                  register={register}
                  resetField={resetField}
                  key="communication"
                  name="communication"
                  placeholder={t("addVacancy.placeholders.communication")}
                  type="text"
                  className=""
                  label={t("addVacancy.form.communication")}
                  errors={errors}
                />
                <Input
                  register={register}
                  resetField={resetField}
                  key="location"
                  name="location"
                  placeholder={t("addVacancy.placeholders.location")}
                  type="text"
                  className=""
                  label={t("addVacancy.form.location")}
                  errors={errors}
                />
              </div>

              <div className="mt-2 flex justify-between">
                <Checkbox
                  name="remote"
                  id="remote"
                  label={t("addVacancy.form.distance")}
                  register={register}
                  type="signUp"
                  errors={errors}
                />
                <Checkbox
                  name="office"
                  id="office"
                  label={t("addVacancy.form.office")}
                  register={register}
                  type="signUp"
                  errors={errors}
                />
                <Checkbox
                  name="mixed"
                  id="mixed"
                  label={t("addVacancy.form.mixed")}
                  register={register}
                  type="signUp"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex w-[445px] flex-col justify-between gap-4">
              <div className="flex flex-col gap-4 pt-2">
                <label>Статус</label>

                <div className="flex flex-col gap-4">
                  <Checkbox
                    name="sendSummary"
                    id="sendSummary"
                    label={t("addVacancy.form.sendSummary")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                  <Checkbox
                    name="HR"
                    id="HR"
                    label={t("addVacancy.form.HR")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                  <Checkbox
                    name="testTask"
                    id="testTask"
                    label={t("addVacancy.form.testTask")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                  <Checkbox
                    name="technicalInterview"
                    id="technicalInterview"
                    label={t("addVacancy.form.technicalInterview")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                  <Checkbox
                    name="rejection"
                    id="rejection"
                    label={t("addVacancy.form.rejection")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                  <Checkbox
                    name="offer"
                    id="offer"
                    label={t("addVacancy.form.offer")}
                    register={register}
                    type="signUp"
                    errors={errors}
                  />
                </div>
              </div>

              <Textarea
                register={register}
                resetField={resetField}
                key="notes"
                name="notes"
                placeholder={t("addVacancy.placeholders.notes")}
                className=""
                label={t("addVacancy.form.notes")}
                errors={errors}
              />
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              onClick={handleSubmitArchive}
            >
              {t("addVacancy.form.archive")}{" "}
              <Icon id={"send"} className="ml-3 h-6 w-6" />
            </Button>
            <Button
              // type="button"
              type="submit"
              className="mx-auto mt-8 bg-button"
              variant="ghost"
              size="big"
              // onClick={() => handleModal()}
            >
              {t("addVacancy.form.save")}
              <Icon id={"check-box"} className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVacancy;
