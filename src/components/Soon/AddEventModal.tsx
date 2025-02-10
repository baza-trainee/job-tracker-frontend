import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";
import { useAppDispatch } from "../../store/hook.ts";
import { useCreateEventMutation } from "../../store/querySlices/eventsQuerySlice.ts";
import { closeModal } from "../../store/slices/modalSlice/modalSlice.ts";

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
      date: date || new Date().toISOString().split("T")[0], // Поки що поточна дата (оновити після інтеграції календаря)
      time: formattedTime,
    };

    try {
      await createEvent(newEvent).unwrap();
      dispatch(closeModal());
      reset(); // Очищаємо форму після успіху
    } catch (error) {
      console.error("Помилка створення події:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-14 flex flex-col align-middle"
    >
      <div className="flex w-full gap-6">
        {/* <SoonCalendarModal /> */}
        {/* Додамо пропс для автозаповнення дати, якщо це підтримується */}
        <SoonCalendarModal onSelectDate={(date) => setValue("date", date)} />
        <div className="w-[445px] text-2xl font-medium">
          <label htmlFor="soonEventName">{t("soonSection.soonName")}</label>
          <Input
            name="soonEventName"
            placeholder={t("soonSection.soonModalPlaceholderName")}
            register={register}
            errors={errors}
            resetField={resetField}
            setValue={setValue}
            isRequired={true}
          />
          <label htmlFor="soonEventNotes" className="mt-4 block">
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
          />
          <p className="mt-4">{t("soonSection.setTime")}</p>
          <div className="flex gap-2">
            <Input
              className="border-grey-500 h-[60px] w-20 rounded-lg border-2 bg-backgroundTertiary px-4 py-[9px] focus:border-color1"
              name="hours"
              placeholder={t("soonSection.soonModalTimeHours")}
              register={register}
              errors={errors}
              resetField={resetField}
              setValue={setValue}
              isRequired={true}
            />
            <div className="flex items-center">
              <span className="text-[57px] font-normal">:</span>
            </div>
            <Input
              className="border-grey-500 h-[60px] w-20 rounded-lg border-2 bg-backgroundTertiary px-4 py-[9px] focus:border-color1"
              name="minutes"
              placeholder={t("soonSection.soonModalTimeMinutes")}
              register={register}
              errors={errors}
              resetField={resetField}
              setValue={setValue}
              isRequired={true}
            />
          </div>
        </div>
      </div>

      <Button
        // type="button"
        type="submit"
        className="mx-auto mt-8 bg-button"
        variant="ghost"
        size="big"
        // onClick={saveVacancy}
        disabled={isLoading}
      >
        {/* {t("soonSection.save")} */}
        {isLoading ? t("loading") : t("soonSection.save")}
        <Icon id={"check-box"} className="ml-3 h-6 w-6" />
      </Button>
    </form>
  );
};

export default AddEventModal;
