import { useTranslation } from "react-i18next";

const FirstVacancyMessage = () => {
  const { t } = useTranslation();
  return (
    <p className="w-[447px] rounded-2xl bg-backgroundTertiary p-4 text-center font-nunito text-2xl">
      {t("statisticsHeader.firstMessage")}
    </p>
  );
};

export default FirstVacancyMessage;
