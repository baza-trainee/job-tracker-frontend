import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import Checkbox from "../../../checkbox/Checkbox";
import Icon from "../../../Icon/Icon";

import { EditVacancySchema } from "../../../../schemas/EditVacancySchema";
import { t } from "i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { closeModal } from "../../../../store/slices/modalSlice/modalSlice";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import {
  useDeleteVacancyByIdMutation,
  useGetVacancyByIdQuery,
  useUpdateVacancyByIdMutation,
} from "../../../../store/querySlices/vacanciesQuerySlice";

const EditVacancy = () => {
  const dispatch = useAppDispatch();

  const { idCardVacancy } = useAppSelector((state) => state.modal);
  const { refetch } = useGetAllUserDataQuery();
  const { data: vacancy } = useGetVacancyByIdQuery({
    vacancyId: idCardVacancy as string,
  });

  const [deleteVacancyById] = useDeleteVacancyByIdMutation();
  const [updateVacancyById] = useUpdateVacancyByIdMutation();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof EditVacancySchema>>({
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
    resolver: zodResolver(EditVacancySchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (vacancy) {
      console.log(idCardVacancy, vacancy);
      //load input
      setValue("company", vacancy.company);
      setValue("vacancy", vacancy.vacancy);
      setValue("link", vacancy.link);
      setValue("communication", vacancy.communication || "");
      setValue("location", vacancy.location || "");
      setValue("note", vacancy.note || "");
      setValue("work_type", vacancy.work_type);
      setValue("isArchived", vacancy.isArchived);
    }
  }, [idCardVacancy, vacancy, setValue]);

  const onSubmit: SubmitHandler<z.infer<typeof EditVacancySchema>> = async (
    formData
  ) => {
    try {
      await updateVacancyById({
        vacancyId: idCardVacancy as string,
        company: formData.company,
        vacancy: formData.vacancy,
        link: formData.link,
        communication: formData.communication,
        location: formData.location,
        note: formData.note,
        work_type: formData.work_type,
        isArchived: formData.isArchived,
      }).unwrap();
      refetch();
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVacancyById({ vacancyId: idCardVacancy as string }).unwrap();
      refetch();
      reset();
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
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
                  // value={vacancy ? vacancy.location : ""}
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
              <Textarea
                register={register}
                resetField={resetField}
                key="note"
                name="note"
                placeholder={t("addVacancy.placeholders.notes")}
                className=""
                label={t("addVacancy.form.notes")}
                errors={errors}
              />
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
                  {/* замінити на функціональний компонент :( */}
                  <span
                    onClick={() => {}}
                    className="-ml-[2px] flex flex-row gap-3 hover:cursor-pointer"
                  >
                    <Icon id={"plus"} className="ml-3 h-6 w-6" /> Додати етап
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              onClick={handleDelete}
            >
              Видалити
              <Icon id={"delete"} className="ml-3 h-6 w-6" />
            </Button>
            <Button
              type="button"
              className="mx-auto mt-8"
              variant="ghost"
              size="small"
              onClick={() => {}}
            >
              {t("addVacancy.form.archive")}{" "}
              <Icon id={"send"} className="ml-3 h-6 w-6" />
            </Button>
            <Button
              type="submit"
              className="mx-auto mt-8 bg-button"
              variant="ghost"
              size="big"
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

export default EditVacancy;
