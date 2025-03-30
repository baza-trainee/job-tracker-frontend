import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppDispatch } from "../../store/hook.ts";
import { useCreateEventMutation } from "../../store/querySlices/eventsQuerySlice.ts";
import { openConfirmation } from "../../store/slices/modalSlice/modalSlice.ts";
// import clsx from "clsx";
import { getEventSchema } from "../../schemas/eventModalSchema.ts";

const AddEventModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [_, { isLoading }] = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getEventSchema()),
  });

  useEffect(() => {
    setValue("hours", undefined); // Установлюємо, що годин ще немає
    setValue("minutes", undefined); // Хвилин теж немає
  }, [setValue]);

  const confirmAddSave = (data: any) => {
    console.log("confirmAddSave викликається!", data);

    dispatch(
      openConfirmation({
        typeConfirmation: "saveAddEvent",
        dataConfirmation: {
          ...data,
          time: `${String(data.hours).padStart(2, "0")}:${String(data.minutes).padStart(2, "0")}`, //Форматуємо час
        },
        resetForm: reset,
      })
    );
  };

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
    <form
      // onSubmit={handleSubmit(onSubmit)}
      // onSubmit={handleSubmit(confirmAddSave)}
      onSubmit={handleSubmit((data) => {
        console.log("onSubmit відбувся", data);
        console.log("Помилки у формі:", errors);
        confirmAddSave(data);
      })}
      className="mt-10 flex w-full flex-col gap-3 align-middle md:gap-4 3xl:mt-14 3xl:gap-6"
    >
      <div className="flex w-full flex-col gap-4 md:flex-row xl:gap-6">
        <div>
          <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} />
          {errors.date?.message && (
            <p className="text-color2">{String(errors.date.message)}</p>
          )}
        </div>

        <div className="flex w-full flex-col font-medium md:w-[350px] xl:w-[445px]">
          <label htmlFor="soonEventName" className="text-xl 3xl:text-2xl">
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
            <p className="mt-4 text-xl 3xl:text-2xl">
              {t("soonSection.setTime")}
            </p>
            <div className="time-content relative grid auto-cols-max auto-rows-max gap-x-2 gap-y-1">
              {/* <Input
                name="hours"
                placeholder="00"
                type="text"
                register={register}
                errors={errors}
                resetField={resetField}
                setValue={setValue}
                isRequired={true}
                isCheckButtons={false}
                maxLength={2}
                // value={watch("hours") ?? "00"} // Прив'язуємо значення до стану форми, гарантовано не буде undefined
                className={clsx(
                  "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px] text-center",
                  "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                )}
                classNameInputCustom={clsx(
                  "border-0 bg-backgroundTertiary p-0 text-center text-[28px] font-medium",
                  "sm:h-auto sm:p-0 sm:text-[28px]",
                  "md:h-auto md:p-0 md:text-[28px]",
                  "xl:text-[32px] xl:font-normal",
                  "2xl:text-[32px]"
                )}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  let value = e.currentTarget.value.replace(/\D/g, ""); // Видаляємо всі нечислові символи
                  if (value.length > 2) value = value.slice(0, 2); // Максимум 2 символи
                  if (+value > 23) return; // Максимум 24 години (Перевірка діапазону годин)
                  setValue("hours", Number(value), { shouldValidate: true }); // Оновлюємо значення, передаємо число + тригеримо валідацію одразу при заповнені
                }}
              /> */}
              <Select
                options={hourOptions}
                onChange={(selectedOption) => {
                  setValue("hours", selectedOption?.value, {
                    shouldValidate: true,
                  });
                  trigger("hours"); // Примусово перевіряємо поле
                }}
                placeholder="00"
                className="w-20"
                classNamePrefix="react-select"
                isSearchable={false}
              />
              {errors.hours && (
                <p className="absolute left-0 top-[50%] border border-gray-900 text-red-500">
                  {String(errors.hours.message)}
                </p>
              )}
              <div className="flex h-[60px] w-6 items-center justify-center">
                <span className="text-[44px] font-normal md:text-[57px]">
                  :
                </span>
              </div>
              <Select
                options={minuteOptions}
                onChange={(selectedOption) =>
                  setValue("minutes", selectedOption?.value, {
                    shouldValidate: true,
                  })
                }
                placeholder="00"
                className="w-20"
                classNamePrefix="react-select"
                isSearchable={false}
              />
              {/* <Input
                name="minutes"
                placeholder="00"
                register={register}
                errors={errors}
                resetField={resetField}
                setValue={setValue}
                isRequired={true}
                isCheckButtons={false}
                className={clsx(
                  "h-[60px] w-20 rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px] text-center",
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
                  setValue("minutes", Number(value)); // Оновлюємо значення, передаємо число
                }}
              /> */}
              <p className="col-span-2 row-start-2 text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeHours")}
              </p>
              <p className="col-span-1 row-start-2 text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeMinutes")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mx-auto bg-button"
        variant="ghost"
        size="big"
        disabled={isLoading}
      >
        {isLoading ? t("loading") : t("soonSection.save")}
        <Icon id={"check-box"} className="ml-3 h-6 w-6" />
      </Button>
    </form>
  );
};

export default AddEventModal;

// watch,
// defaultValues: {
//   hours: "", // Початкове значення для годин
//   minutes: "", // Початкове значення для хвилин
// },
// const onSubmit = async (data: any) => {
//   console.log("Форма відправлена:", data);

//   const { soonEventName, soonEventNotes, hours, minutes, date } = data;

//   // Формуємо час у форматі HH:MM
//   const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

//   const newEvent = {
//     name: soonEventName,
//     text: soonEventNotes || "",
//     date: date || new Date().toISOString().split("T")[0],
//     time: formattedTime,
//   };

//   try {
//     await createEvent(newEvent).unwrap();
//     dispatch(closeModal());
//     reset();
//   } catch (error) {
//     console.error("Помилка створення події:", error);
//   }
// };
