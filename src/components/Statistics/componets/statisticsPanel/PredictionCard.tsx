import { useTranslation } from "react-i18next";

const PredictionCard = () => {
  const { t } = useTranslation();
  return (
    <div className="text flex h-[139px] w-[447px] flex-col gap-1 rounded-2xl bg-color5 px-[35px] py-4">
      <h5 className="text-base leading-[135%]">
        {t("statisticsHeader.predictions")}
      </h5>
      <p className="text-xl leading-[135%]">
        Прийдешні події підкажуть, що шлях до успіху може бути легшим, ніж
        здається, якщо зберігати легкість і посмішку.
      </p>
    </div>
  );
};
export default PredictionCard;
