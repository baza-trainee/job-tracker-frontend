import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVacancySchema } from "../../../../schemas/AddVacancySchema";
import { t } from "i18next";
import Icon from "../../../Icon/Icon";
import { useCreateVacancyMutation } from "../../../../store/querySlices/vacanciesQuerySlice";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import { useState } from "react";

import { useAppDispatch } from "../../../../store/hook";
import { closeModal } from "../../../../store/slices/modalSlice/modalSlice";
import classNames from "classnames";

//CheckBox
import { CheckboxCalendarItem } from "./CheckboxCalendarItem";
import Calendar from "react-calendar";
import moment from "moment";

//Input Radio
import { InputRadio } from "../../../inputs/InputRadio/InputRadio";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CheckBoxValue =
  | "sendSummaryCalendar"
  | "HRCalendar"
  | "testTaskCalendar"
  | "technicalInterviewCalendar"
  | "rejectionCalendar"
  | "offerCalendar";

type CheckBoxCalendarValue =
  | "sendSummaryCalendar"
  | "HRCalendar"
  | "testTaskCalendar"
  | "technicalInterviewCalendar"
  | "rejectionCalendar"
  | "offerCalendar";

const AddVacancy = () => {
  const { refetch } = useGetAllUserDataQuery();
  const [createVacancy] = useCreateVacancyMutation();
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

  // CheckBox and Calendar
  const [dateState, setDateState] = useState<Value>(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [nameStatus, setNameStatus] = useState<string>("");
  
  const changeDate = (e: Value) => {
    setDateState(e);
    if (e instanceof Date) {
      setValue(
        `${nameStatus}Calendar` as CheckBoxCalendarValue,
        moment(e).format("DD.MM.YY")
      );
    }
    setIsOpenCalendar(false);
  };

  const openCalendarCheckbox = (checkboxName: string) => {
    setNameStatus(checkboxName);
    if (!getValues(checkboxName as CheckBoxValue)) {
      setIsOpenCalendar(true);
    } else {
      setValue(`${checkboxName}Calendar` as CheckBoxCalendarValue, "");
      setIsOpenCalendar(false);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof AddVacancySchema>> = async (
    data
  ) => {
    console.log(data);
    try {
      const response = await createVacancy(data).unwrap();
      console.log(response);

      refetch();
      reset();
      dispatch(closeModal());
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
                <InputRadio
                  name="work_type"
                  id="remote"
                  label={t("addVacancy.form.distance")}
                  register={register}
                  type="signUp"
                  errors={errors}
                  value="remote"
                />
                <InputRadio
                  name="work_type"
                  id="office"
                  label={t("addVacancy.form.office")}
                  register={register}
                  type="signUp"
                  errors={errors}
                  value="office"
                />
                <InputRadio
                  name="work_type"
                  id="hybrid"
                  label={t("addVacancy.form.mixed")}
                  register={register}
                  type="signUp"
                  errors={errors}
                  value="hybrid"
                />
              </div>
            </div>

            <div className="flex w-[445px] flex-col justify-between gap-4">
              <div className="relative flex flex-col gap-4 pt-2">
                <label>Статус</label>

                <div className="flex flex-col gap-4">
                  <CheckboxCalendarItem
                    name="sendSummary"
                    id="sendSummary"
                    label={t("addVacancy.form.sendSummary")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />

                  <CheckboxCalendarItem
                    name="HR"
                    id="HR"
                    label={t("addVacancy.form.HR")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />

                  <CheckboxCalendarItem
                    name="testTask"
                    id="testTask"
                    label={t("addVacancy.form.testTask")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />

                  <CheckboxCalendarItem
                    name="technicalInterview"
                    id="technicalInterview"
                    label={t("addVacancy.form.technicalInterview")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />
                  <CheckboxCalendarItem
                    name="rejection"
                    id="rejection"
                    label={t("addVacancy.form.rejection")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />
                  <CheckboxCalendarItem
                    name="offer"
                    id="offer"
                    label={t("addVacancy.form.offer")}
                    type="signUp"
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    openCalendarCheckbox={openCalendarCheckbox}
                  />
                  <Calendar
                    className={classNames(
                      "custom-size z-10 w-full rounded-b-xl bg-backgroundMain",
                      isOpenCalendar
                        ? "visible opacity-100"
                        : "sr-only h-0 opacity-0"
                    )}
                    nextLabel={<Icon id={"arrow-right"} className="h-6 w-6" />}
                    prevLabel={<Icon id={"arrow-left"} className="h-6 w-6" />}
                    formatMonthYear={(locale, date) =>
                      `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`
                    }
                    onChange={changeDate}
                    value={dateState}
                  />
                </div>
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

export default AddVacancy;
