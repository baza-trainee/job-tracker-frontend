import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import SoonCalendarModal from "../Calendar/SoonCalendarModal.tsx";
import { Input } from "../inputs/Input/Input.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import Icon from "../Icon/Icon.tsx";

const AddEventModal = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log("Форма відправлена:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col align-middle mt-14">
            <div className="w-full flex gap-6">
                <SoonCalendarModal />
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
                    <label htmlFor="soonEventNotes" className="block mt-4">{t("soonSection.soonNotes")}</label>
                    <Input
                        name="soonEventNotes"
                        placeholder={t("soonSection.soonModalPlaceholderNotes")}
                        register={register}
                        errors={errors}
                        resetField={resetField}
                        setValue={setValue}
                        isRequired={true}
                        type="textarea"
                        rows={4}
                    />
                    <p className="mt-4">{t("soonSection.setTime")}</p>
                    <div className="flex gap-2">
                        <Input
                            className="w-20 h-[60px] px-4 py-[9px] border-2 rounded-lg border-grey-500 bg-backgroundTertiary focus:border-color1"
                            name="setTime"
                            placeholder={t("soonSection.soonModalTimeHours")}
                            register={register}
                            errors={errors}
                            resetField={resetField}
                            setValue={setValue}
                            isRequired={false}
                        />
                        <div className="flex items-center">
                            <span className="text-[57px] font-normal">:</span>
                        </div>
                        <Input
                            className="w-20 h-[60px] px-4 py-[9px] border-2 rounded-lg border-grey-500 bg-backgroundTertiary focus:border-color1"
                            name="setTime"
                            placeholder={t("soonSection.soonModalTimeMinutes")}
                            register={register}
                            errors={errors}
                            resetField={resetField}
                            setValue={setValue}
                            isRequired={false}
                        />
                    </div>
                </div>
            </div>
            <Button
                type="button"
                className="mx-auto mt-8 bg-button"
                variant="ghost"
                size="big"
            // onClick={saveVacancy}
            >
                {t("soonSection.save")}
                <Icon id={"check-box"} className="ml-3 h-6 w-6" />
            </Button>
        </form>
    )
};

export default AddEventModal;
