import { useTranslation } from "react-i18next";

const FirstVacancyMessage = () => {
  const { t } = useTranslation();
  return (
    <p className="flex h-[81px] w-[280px] items-center justify-center rounded-2xl bg-backgroundTertiary p-3 px-9 text-center font-nunito text-sm leading-[135%] md:w-[447px] md:p-4 md:text-base xl:h-[98px] xl:text-2xl 3xl:h-[140px] 3xl:w-[520px] 3xl:p-8 3xl:text-[28px] 3xl:leading-normal">
      {t("statisticsHeader.firstMessage")}
    </p>
  );
};

export default FirstVacancyMessage;
