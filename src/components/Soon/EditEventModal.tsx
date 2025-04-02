import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Event as EventData } from "@/types/event.types.ts";
import { useForm, useWatch } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppSelector, useAppDispatch } from "../../store/hook.ts";
import { selectEventData } from "../../store/slices/modalSlice/selectors.ts";
import { openConfirmation } from "../../store/slices/modalSlice/modalSlice.ts";
import clsx from "clsx";
import { getEventSchema } from "../../schemas/eventModalSchema.ts";

type FormValues = {
  soonEventName: string;
  soonEventNotes: string;
  hours: number | null;
  minutes: number | null;
  date: string;
};

const EditEventModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const eventData: EventData | null = useAppSelector(selectEventData) ?? null;

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(getEventSchema()),
    defaultValues: {
      soonEventName: "",
      soonEventNotes: "",
      hours: null,
      minutes: null,
      date: "",
    },
  });

  const selectedHour = useWatch({ control, name: "hours" });
  const selectedMinute = useWatch({ control, name: "minutes" });

  useEffect(() => {
    if (!eventData) return;
    // console.log("Завантажені дані події:", eventData);
    const [hours, minutes] = eventData.time.split(":").map(Number);

    reset({
      soonEventName: eventData.name || "",
      soonEventNotes: eventData.text || "",
      hours: isNaN(hours) ? null : hours,
      minutes: isNaN(minutes) ? null : minutes,
      date: eventData.date || "",
    });
  }, [eventData, reset]);

  const confirmDelete = () => {
    console.log("Викликаємо openConfirmation з deleteEvent:", eventData);
    if (!eventData) return;
    dispatch(
      openConfirmation({
        typeConfirmation: "deleteEvent",
        dataConfirmation: eventData,
      })
    );
  };

  const confirmSave = (data: any) => {
    console.log("Викликаємо openConfirmation з saveEditEvent:", data);
    dispatch(
      openConfirmation({
        typeConfirmation: "saveEditEvent",
        dataConfirmation: {
          ...data,
          id: eventData?.id, // додаємо ID події
        },
      })
    );
  };

  // const hourOptions = [
  //   { value: null, label: "--" },
  //   ...Array.from({ length: 24 }, (_, i) => ({
  //     value: i,
  //     label: i.toString().padStart(2, "0"),
  //   })),
  // ];

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  useEffect(() => {
    register("hours", { required: true });
    register("minutes", { required: true });
  }, [register]);

  return (
    <form className="mt-10 flex w-full flex-col gap-3 align-middle md:gap-4 3xl:mt-14 3xl:gap-6">
      <div className="flex w-full flex-col gap-4 md:flex-row xl:gap-6">
        <div>
          <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} />
          {errors.date?.message && (
            <p className="text-color2">{String(errors.date.message)}</p>
          )}
        </div>

        <div className="flex w-full flex-col font-medium md:w-[350px] xl:w-[445px]">
          <label
            htmlFor="soonEventName"
            className="text-base xl:text-xl 3xl:text-2xl"
          >
            {t("soonSection.soonName")}
          </label>
          <Input
            name="soonEventName"
            placeholder={t("soonSection.soonModalNamePlaceholder")}
            register={register}
            errors={errors}
            resetField={resetField}
            setValue={setValue}
            isRequired={true}
            isCheckButtons={true}
            classNameInputCustom="rounded-lg"
          />

          <label
            htmlFor="soonEventNotes"
            className="mt-4 block text-base xl:text-xl 3xl:text-2xl"
          >
            {t("soonSection.soonNotes")}
          </label>
          <Input
            name="soonEventNotes"
            placeholder={t("soonSection.soonModalNotesPlaceholder")}
            register={register}
            errors={errors}
            resetField={resetField}
            setValue={setValue}
            isRequired={false}
            type="textarea"
            rows={4}
            isCheckButtons={false}
          />

          <div className="flex w-full flex-col items-center md:items-start">
            <p className="mt-4 text-base xl:text-xl 3xl:text-2xl">
              {t("soonSection.setTime")}
            </p>
            <div className="time-content grid auto-cols-max auto-rows-max gap-x-2 gap-y-1">
              <Select
                options={hourOptions}
                value={hourOptions.find(
                  (option) => option.value === selectedHour
                )}
                onChange={(selectedOption) => {
                  setValue(
                    "hours",
                    selectedOption ? selectedOption.value : null,
                    { shouldValidate: true }
                  );
                  trigger("hours"); // Примусово перевіряємо поле
                }}
                placeholder="00"
                className={clsx(
                  "select__event-modal",
                  "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-3 py-[9px]",
                  "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                )}
                classNamePrefix="react-select"
                isSearchable={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }} // Прибираємо стрілочку та роздільник
              />
              <div className="flex h-[60px] w-6 items-center justify-center">
                <span className="box-border text-[44px] font-normal leading-[44px] md:pb-[3px] md:text-[57px] md:leading-[57px]">
                  :
                </span>
              </div>

              <Select
                options={minuteOptions}
                value={minuteOptions.find(
                  (option) => option.value === selectedMinute
                )}
                onChange={(selectedOption) =>
                  setValue(
                    "minutes",
                    selectedOption ? selectedOption.value : null,
                    { shouldValidate: true }
                  )
                }
                placeholder="00"
                className={clsx(
                  "select__event-modal",
                  "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px]",
                  "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                )}
                classNamePrefix="react-select"
                isSearchable={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }} // Прибираємо стрілочку та роздільник
              />
              <p className="col-span-2 row-start-2 text-sm xl:text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeHours")}
              </p>
              <p className="col-span-1 row-start-2 text-sm xl:text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeMinutes")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-center gap-2 md:flex-row md:gap-6">
        <Button
          type="button"
          className="md:px-8"
          variant="ghost"
          size="big"
          onClick={confirmDelete}
        >
          {t("soonSection.delete")}
          <Icon id={"delete"} className="ml-3 h-6 w-6" />
        </Button>

        <Button
          type="submit"
          className="bg-button"
          variant="ghost"
          size="big"
          onClick={handleSubmit(confirmSave)}
        >
          {t("soonSection.save")}
          <Icon id={"check-box"} className="ml-3 h-6 w-6" />
        </Button>
      </div>
    </form>
  );
};

export default EditEventModal;

{
  /* <Input
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
  onInput={(e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, ""); // Видаляємо всі нечислові символи
    if (+value > 23) return; // Максимум 24 години (Перевірка діапазону годин)
    setValue("hours", value); // Оновлюємо значення, передаємо число
  }}
/>; */
}
{
  /* <Input
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
  onInput={(e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, ""); // Видаляємо всі нечислові символи
    if (+value > 59) return; // Максимум 59 хвилин (Перевірка діапазону хвилин)
    setValue("minutes", value); // Оновлюємо значення, передаємо число
  }}
/>; */
}
