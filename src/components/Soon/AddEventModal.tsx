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
                <div className="text-2xl font-medium">
                    <p>{t("soonSection.soonName")}</p>
                    <Input
                        name="eventName"
                        placeholder={t("soonSection.soonNamePlaceholder")}
                        register={register}
                        errors={errors}
                        resetField={resetField}
                        setValue={setValue}
                        isRequired={true}
                    />
                    <p>{t("soonSection.soonNotes")}</p>
                    <p>{t("soonSection.setTime")}</p>
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
