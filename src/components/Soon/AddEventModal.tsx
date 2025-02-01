import { useTranslation } from "react-i18next";

const AddEventModal = () => {
    const { t } = useTranslation();

    return (
        <div className="p-4 w-full flex flex-col gap-4">
            <h2 className="text-xl font-bold">{t("addEvent.modalTitle")}</h2>
            <p>{t("addEvent.modalDescription")}</p>
            {/* Тут можна додати форми для введення події */}
        </div>
    )
};

export default AddEventModal;
