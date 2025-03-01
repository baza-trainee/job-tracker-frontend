import { useTranslation } from "react-i18next";
import { Event as EventData } from "@/types/event.types.ts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppSelector, useAppDispatch } from "../../store/hook.ts";
import { selectEventData } from "../../store/slices/modalSlice/selectors.ts";
import { closeModal } from "../../store/slices/modalSlice/modalSlice.ts";
import {
  useDeleteEventByIdMutation,
  useUpdateEventByIdMutation,
  useGetAllEventsQuery,
} from "../../store/querySlices/eventsQuerySlice.ts";
import clsx from "clsx";

const EditEventModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const eventData: EventData | null = useAppSelector(selectEventData) ?? null;
  const [deleteEvent] = useDeleteEventByIdMutation();
  const [updateEvent] = useUpdateEventByIdMutation();
  const { refetch } = useGetAllEventsQuery();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      soonEventName: "",
      soonEventNotes: "",
      hours: "",
      minutes: "",
      date: "",
    },
  });

  useEffect(() => {
    if (!eventData) return;
    // console.log("Завантажені дані події:", eventData);
    const [hours, minutes] = eventData.time.split(":");

    if (eventData) {
      reset({
        soonEventName: eventData.name || "",
        soonEventNotes: eventData.text || "",
        hours: hours || "",
        minutes: minutes || "",
      });
    }
  }, [eventData, reset]);

  const handleDelete = async () => {
    if (!eventData) return;
    try {
      await deleteEvent(eventData.id).unwrap();
      // console.log("Подію видалено", eventData.id);
      dispatch(closeModal());
      refetch();
    } catch (error) {
      console.error("Помилка видалення", error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!eventData) return;
    try {
      const updateTime = `${data.hours}:${data.minutes}:00`;

      // console.log("Дані перед оновленням:", {
      //   id: eventData.id,
      //   name: data.soonEventName,
      //   text: data.soonEventNotes,
      //   time: updateTime,
      //   date: data.date,
      // });

      await updateEvent({
        id: eventData.id,
        name: data.soonEventName,
        text: data.soonEventNotes,
        time: updateTime,
        date: data.date,
      }).unwrap();

      // console.log("Подію оновлено", eventData.id);
      dispatch(closeModal());
      refetch();
    } catch (error) {
      console.error("Помилка оновлення", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="mt-10 flex flex-col align-middle 3xl:mt-14"
    >
      <div className="flex w-full gap-6">
        {/* Вибір дати (поки що без встановлення у форму) */}
        <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} />
        {/* <SoonCalendarModal /> */}

        <div className="w-[445px] font-medium">
          <label htmlFor="soonEventName" className="text-xl 3xl:text-2xl">
            {t("soonSection.soonName")}
          </label>
          <Input
            name="soonEventName"
            placeholder={t("soonSection.soonModalPlaceholderName")}
            register={register}
            errors={errors}
            resetField={resetField}
            setValue={setValue}
            isRequired={true}
            isCheckButtons={false}
            classNameInputCustom="rounded-lg"
          />

          <label
            htmlFor="soonEventNotes"
            className="mt-4 block text-xl 3xl:text-2xl"
          >
            {t("soonSection.soonNotes")}
          </label>
          <Input
            name="soonEventNotes"
            placeholder={t("soonSection.soonModalPlaceholderNotes")}
            register={register}
            errors={errors}
            resetField={resetField}
            setValue={setValue}
            isRequired={false}
            type="textarea"
            rows={4}
            isCheckButtons={false}
          />

          <p className="mt-4 text-xl 3xl:text-2xl">
            {t("soonSection.setTime")}
          </p>
          <div className="time-content grid auto-cols-max auto-rows-max gap-x-2 gap-y-1">
            <Input
              name="hours"
              placeholder="00"
              type="text"
              register={register}
              errors={errors}
              resetField={resetField}
              setValue={setValue}
              isRequired={true}
              isCheckButtons={false}
              className={clsx(
                "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px]",
                "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
              )}
              classNameInputCustom={clsx(
                "border-0 bg-backgroundTertiary p-0 text-center text-[28px] font-medium",
                "sm:h-auto sm:p-0 sm:text-[28px]",
                "md:h-auto md:p-0 md:text-[28px]",
                "xl:text-[32px] xl:font-normal",
                "2xl:text-[32px]"
              )}
            />
            <div className="flex h-[60px] w-6 items-center justify-center">
              <span className="text-[57px] font-normal">:</span>
            </div>
            <Input
              name="minutes"
              placeholder="00"
              register={register}
              errors={errors}
              resetField={resetField}
              setValue={setValue}
              isRequired={true}
              isCheckButtons={false}
              className={clsx(
                "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px]",
                "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
              )}
              classNameInputCustom={clsx(
                "border-0 bg-backgroundTertiary p-0 text-center text-[28px] font-medium",
                "sm:h-auto sm:p-0 sm:text-[28px]",
                "md:h-auto md:p-0 md:text-[28px]",
                "xl:text-[32px] xl:font-normal",
                "2xl:text-[32px]"
              )}
            />
            <p className="col-span-2 row-start-2 text-base 3xl:text-xl">
              {t("soonSection.soonModalTimeHours")}
            </p>
            <p className="col-span-1 row-start-2 text-base 3xl:text-xl">
              {t("soonSection.soonModalTimeMinutes")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Button
          type="button"
          className="mt-4 md:px-8 3xl:mt-8"
          variant="ghost"
          size="big"
          onClick={handleDelete}
          // disabled={isLoading}
        >
          {t("soonSection.delete")}
          {/* {isLoading ? t("loading") : t("soonSection.save")} */}
          <Icon id={"delete"} className="ml-3 h-6 w-6" />
        </Button>

        <Button
          type="submit"
          className="mt-4 bg-button md:px-8 3xl:mt-8"
          variant="ghost"
          size="big"
          // disabled={isLoading}
        >
          {t("soonSection.save")}
          {/* {isLoading ? t("loading") : t("soonSection.save")} */}
          <Icon id={"check-box"} className="ml-3 h-6 w-6" />
        </Button>
      </div>
    </form>
  );
};

export default EditEventModal;
