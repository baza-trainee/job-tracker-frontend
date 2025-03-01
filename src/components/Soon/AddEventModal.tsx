import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppDispatch } from "../../store/hook.ts";
import { useCreateEventMutation } from "../../store/querySlices/eventsQuerySlice.ts";
import { closeModal } from "../../store/slices/modalSlice/modalSlice.ts";
import clsx from "clsx";

const AddEventModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Форма відправлена:", data);

    const { soonEventName, soonEventNotes, hours, minutes, date } = data;

    // Формуємо час у форматі HH:MM
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

    const newEvent = {
      name: soonEventName,
      text: soonEventNotes || "",
      date: date || new Date().toISOString().split("T")[0],
      time: formattedTime,
    };

    try {
      await createEvent(newEvent).unwrap();
      dispatch(closeModal());
      reset();
    } catch (error) {
      console.error("Помилка створення події:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col align-middle 3xl:mt-14"
    >
      <div className="flex w-full gap-6">
        <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} />

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
              // onInput={(e) => {
              //   const input = e.currentTarget;
              //   const value = input.value.replace(/\D/g, ""); // Видаляємо нецифрові символи
              //   if (+value > 24) return; // Не даємо ввести більше 24
              //   setValue("hours", value); // Оновлюємо значення
              // }}
              // onKeyDown={(e) => {
              //   if (
              //     !/[\d]/.test(e.key) &&
              //     e.key !== "Backspace" &&
              //     e.key !== "Tab"
              //   ) {
              //     e.preventDefault(); // Забороняємо всі символи, окрім цифр, Backspace і Tab
              //   }
              // }}
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

      <Button
        type="submit"
        className="mx-auto mt-4 bg-button 3xl:mt-8"
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
