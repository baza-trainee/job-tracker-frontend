import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppDispatch } from "../../store/hook.ts";
import {
  useUpdateEventByIdMutation,
  useDeleteEventByIdMutation,
} from "../../store/querySlices/eventsQuerySlice.ts";
import { closeModal } from "../../store/slices/modalSlice/modalSlice.ts";
import clsx from "clsx";
import { Event } from "../../types/event.types.ts";

type EditEventModalProps = {
  selectedEvent: Event | null;
};

const EditEventModal: React.FC<EditEventModalProps> = ({ selectedEvent }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [updateEvent] = useUpdateEventByIdMutation();
  const [deleteEvent] = useDeleteEventByIdMutation();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      soonEventName: "",
      soonEventNotes: "",
      time: "",
    },
  });

  useEffect(() => {
    if (selectedEvent) {
      setValue("soonEventName", selectedEvent.name);
      setValue("soonEventNotes", selectedEvent.text || "");
      setValue("time", selectedEvent.time);
    }
  }, [selectedEvent, setValue]);

  const onSubmit = async (data: {
    soonEventName: string;
    soonEventNotes: string;
    time: string;
  }) => {
    if (!selectedEvent) return;

    await updateEvent({
      id: selectedEvent.id,
      name: data.soonEventName,
      text: data.soonEventNotes,
      time: data.time,
    });

    dispatch(closeModal());
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    await deleteEvent({ id: selectedEvent.id });
    dispatch(closeModal());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-14 flex flex-col align-middle"
    >
      <div className="flex w-full gap-6">
        {/* Вибір дати (поки що без встановлення у форму) */}
        {/* <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} /> */}
        <SoonCalendarModal />

        <div className="w-[445px] font-medium">
          <label htmlFor="soonEventName" className="text-base 3xl:text-2xl">
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
            className="mt-4 block text-base 3xl:text-2xl"
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

          <p className="mt-4 text-base 3xl:text-2xl">
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
                "border-0 bg-backgroundTertiary p-0 text-[28px] font-medium",
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
                "border-0 bg-backgroundTertiary p-0 text-[28px] font-medium",
                "sm:h-auto sm:p-0 sm:text-[28px]",
                "md:h-auto md:p-0 md:text-[28px]",
                "xl:text-[32px] xl:font-normal",
                "2xl:text-[32px]"
              )}
            />
            <p className="col-span-2 row-start-2 text-sm">
              {t("soonSection.soonModalTimeHours")}
            </p>
            <p className="col-span-1 row-start-2 text-sm">
              {t("soonSection.soonModalTimeMinutes")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Button
          type="button"
          className="mt-4"
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
          className="mt-4 bg-button"
          variant="ghost"
          size="big"
          // onClick={saveVacancy}
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
