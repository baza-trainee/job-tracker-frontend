import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppDispatch } from "../../store/hook.ts";
import { useCreateEventMutation } from "../../store/querySlices/eventsQuerySlice.ts";
import { openConfirmation } from "../../store/slices/modalSlice/modalSlice.ts";
import clsx from "clsx";
import { getEventSchema } from "../../schemas/eventModalSchema.ts";

interface OptionType {
  value: number;
  label: string;
}

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
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getEventSchema()),
  });

  const [menuOpenHours, setMenuOpenHours] = useState(false);
  const [menuOpenMinutes, setMenuOpenMinutes] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);
  const selectHoursRef = useRef<any>(null);
  const selectMinutesRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue("hours", undefined); // Установлюємо, що годин ще немає
    setValue("minutes", undefined); // Хвилин теж немає
  }, [setValue]);

  const confirmAddSave = (data: any) => {
    // console.log("confirmAddSave викликається!", data);

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

  const handleInputClick = (type: "hours" | "minutes") => {
    // console.log("handleInputClick викликано");
    const isHours = type === "hours";
    const ref = isHours ? selectHoursRef.current : selectMinutesRef.current;
    const isOpen = isHours ? menuOpenHours : menuOpenMinutes;
    const setMenu = isHours ? setMenuOpenHours : setMenuOpenMinutes;

    if (ref) {
      if (isOpen) {
        ref?.blur?.();
        ref?.closeMenu?.();
        setMenu(false);
      } else {
        ref?.openMenu?.();
        setMenu(true);
      }
    }
  };

  const handleInputChanged = () => {
    setInputChanged(true);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // console.log("onSubmit відбувся", data);
        // console.log("Помилки у формі:", errors);
        confirmAddSave(data);
      })}
      className="mt-4 flex w-full flex-col gap-3 align-middle md:gap-4 xl:mt-10 3xl:mt-14 3xl:gap-6"
    >
      <div className="flex w-full flex-col gap-4 md:flex-row xl:gap-6">
        <div>
          <SoonCalendarModal
            onSelectDate={(date) => setValue("date", date)}
            onChange={handleInputChanged}
          />
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
            onChange={handleInputChanged}
          />

          <label
            htmlFor="soonEventNotes"
            className="mt-3 block text-base xl:mt-4 xl:text-xl 3xl:text-2xl"
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
            className="textarea-event"
            classNameInputCustom="resize-none textarea-event-lg textarea-event"
            onChange={handleInputChanged}
          />

          <div className="flex w-full flex-col items-center md:items-start">
            <p className="mt-2 text-base xl:mt-4 xl:text-xl 3xl:text-2xl">
              {t("soonSection.setTime")}
            </p>
            <div className="time-content grid auto-cols-max auto-rows-max gap-x-2 gap-y-1">
              <div className="container-hours relative flex h-[54px] w-20 xl:h-[60px]">
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
                  autoComplete="off"
                  maxLength={2}
                  // value={watch("hours") ?? ""} // Прив'язуємо значення до стану форми, гарантовано не буде undefined
                  className={clsx(
                    "pointer-events-auto z-10",
                    "h-full w-full rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-2 text-center xl:py-[9px]",
                    "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                  )}
                  classNameInputCustom={clsx(
                    "border-0 bg-backgroundTertiary p-0 text-center text-[28px] font-medium",
                    "sm:h-auto sm:p-0 sm:text-[24px]",
                    "md:h-auto md:p-0 md:text-[24px]",
                    "xl:text-[32px] xl:font-normal",
                    "2xl:text-[32px]"
                  )}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    handleInputChanged();
                    let value = e.currentTarget.value.replace(/\D/g, ""); // Видаляємо всі нечислові символи
                    if (value.length > 2) value = value.slice(0, 2); // Максимум 2 символи
                    if (+value > 23) return; // Максимум 24 години (Перевірка діапазону годин)
                    setValue("hours", Number(value), { shouldValidate: true }); // Оновлюємо значення, передаємо число + тригеримо валідацію одразу при заповнені
                  }}
                  onClick={() => handleInputClick("hours")}
                  ref={inputRef}
                  onInput={() => setMenuOpenHours(false)}
                />

                <Select<OptionType>
                  ref={(ref) => {
                    // Зберігаємо доступ до внутрішнього методу select
                    // console.log("Select ref встановлюється:", ref);
                    if (ref) {
                      selectHoursRef.current = ref;
                    }
                  }}
                  options={hourOptions}
                  value={hourOptions.find(
                    (option) => option.value === Number(watch("hours")) || null
                  )} // Прив’язуємо селект до стану
                  onChange={(selectedOption: SingleValue<OptionType>, _) => {
                    handleInputChanged();
                    setMenuOpenHours(false);
                    setValue("hours", selectedOption?.value ?? "", {
                      shouldValidate: true,
                    });
                    trigger("hours"); // Примусово перевіряємо поле
                  }}
                  placeholder="00"
                  className={clsx(
                    "select__event-modal",
                    "z-1 left-0 top-0 cursor-pointer",
                    "h-full w-full rounded-lg border-2 border-transparent bg-backgroundTertiary",
                    "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                  )}
                  classNamePrefix="react-select"
                  isSearchable={false}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  menuIsOpen={menuOpenHours} // контролюємо вручну відкриття селекта
                  onMenuOpen={() => setMenuOpenHours(true)}
                  onMenuClose={() => setMenuOpenHours(false)}
                />
              </div>

              <div className="flex h-[60px] w-6 items-center justify-center">
                <span className="box-border text-[44px] font-normal leading-[44px] md:pb-[3px] md:text-[57px] md:leading-[57px]">
                  :
                </span>
              </div>

              <div className="container-minutes relative flex h-[54px] w-20 xl:h-[60px]">
                <Input
                  name="minutes"
                  placeholder="00"
                  type="text"
                  register={register}
                  errors={errors}
                  resetField={resetField}
                  setValue={setValue}
                  isRequired={false}
                  isCheckButtons={false}
                  autoComplete="off"
                  maxLength={2}
                  className={clsx(
                    "pointer-events-auto z-10",
                    "h-full w-full rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px] text-center",
                    "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                  )}
                  classNameInputCustom={clsx(
                    "border-0 bg-backgroundTertiary p-0 text-center text-[28px] font-medium",
                    "sm:h-auto sm:p-0 sm:text-[24px]",
                    "md:h-auto md:p-0 md:text-[24px]",
                    "xl:text-[32px] xl:font-normal",
                    "2xl:text-[32px]"
                  )}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    handleInputChanged();
                    let value = e.currentTarget.value.replace(/\D/g, ""); // Видаляємо всі нечислові символи
                    if (value.length > 2) value = value.slice(0, 2); // Максимум 2 символи
                    if (+value > 59) return; // Максимум 59 хвилин (Перевірка діапазону хвилин)
                    setValue("minutes", Number(value), {
                      shouldValidate: true,
                    }); // Оновлюємо значення, передаємо число + тригеримо валідацію одразу при заповнені
                  }}
                  onClick={() => handleInputClick("minutes")}
                  ref={inputRef}
                  onInput={() => setMenuOpenMinutes(false)}
                />

                <Select<OptionType>
                  ref={(ref) => {
                    if (ref) {
                      selectMinutesRef.current = ref;
                    }
                  }}
                  options={minuteOptions}
                  value={minuteOptions.find(
                    (option) =>
                      option.value === Number(watch("minutes")) || null
                  )}
                  onChange={(selectedOption: SingleValue<OptionType>, _) => {
                    handleInputChanged();
                    setMenuOpenMinutes(false);
                    setValue("minutes", selectedOption?.value ?? "", {
                      shouldValidate: true,
                    });
                    trigger("minutes");
                  }}
                  placeholder="00"
                  className={clsx(
                    "select__event-modal",
                    "z-1 left-0 top-0 cursor-pointer",
                    "h-full w-full rounded-lg border-2 border-transparent bg-backgroundTertiary px-4 py-[9px]",
                    "focus-within:border-color1 hover:border-color1 focus:border-color1 active:border-color1"
                  )}
                  classNamePrefix="react-select"
                  isSearchable={false}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  menuIsOpen={menuOpenMinutes}
                  onMenuOpen={() => setMenuOpenMinutes(true)}
                  onMenuClose={() => setMenuOpenMinutes(false)}
                />
              </div>

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
        // disabled={isLoading}
        disabled={inputChanged === false}
      >
        {isLoading ? t("loading") : t("soonSection.save")}
        <Icon id={"check-box"} className="ml-3 h-6 w-6" />
      </Button>
    </form>
  );
};

export default AddEventModal;

// if (selectRef.current) {
//   if (menuOpen) {
//     selectRef.current?.blur(); // Закриває меню
//     selectRef.current?.closeMenu?.(); // Пробуємо безпечне закриття
//     setMenuOpen(false);
//   } else {
//     selectRef.current?.openMenu?.();
//     setMenuOpen(true);
//   }
// }

// onMenuOpen={() => {
//   setTimeout(() => inputRef.current?.focus(), 0); // Фокусуємо input
// }} // setTimeout для того, щоб фокус спрацював після відкриття меню

{
  /* {errors.hours && (
    <p className="absolute left-0 top-[50%] text-red-500">
        {String(errors.hours.message)}
    </p>
  )} */
}

// readOnly
// onFocus={() => {
//   setMenuOpen((prev) => {
//     // Якщо вже відкрите — закриємо
//     if (prev) {
//       return false;
//     } else {
//       selectRef.current?.openMenu?.();
//       return true;
//     }
//   });
// }}

// if (selectRef.current) {
//   console.log("selectRef.current знайдено", selectRef.current);
//   // selectRef.current.focus(); // Фокусує select
//   // selectRef.current.openMenu(); // Відкриває меню
//   // selectRef.current.focus?.(); // безпечно перевіримо наявність методу
//   selectRef.current.openMenu?.(); // те саме тут
//   setMenuOpen(true);
// } else {
//   console.log("selectRef.current НЕ знайдено");
// }

{
  /* <div className="flex h-[60px] w-6 items-center justify-center">
                <span className="box-border text-[44px] font-normal leading-[44px] md:pb-[3px] md:text-[57px] md:leading-[57px]">
                  :
                </span>
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
              />

              <Select
                options={minuteOptions}
                onChange={(selectedOption) =>
                  setValue("minutes", selectedOption?.value, {
                    shouldValidate: true,
                  })
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
                }}
              />
              
              <p className="col-span-2 row-start-2 text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeHours")}
              </p>
              <p className="col-span-1 row-start-2 text-base 3xl:text-xl">
                {t("soonSection.soonModalTimeMinutes")}
              </p> */
}

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
/>; */
}

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
