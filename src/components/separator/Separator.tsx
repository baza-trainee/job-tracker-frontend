import { useTranslation } from "react-i18next";

const Separator = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between text-textBlack before:flex-[1] before:border-[1px] before:border-[solid] before:border-textBlack after:flex-[1] after:border-[1px] after:border-[solid] after:border-textBlack">
      <div className="m-2 text-[10px] md:m-4 md:text-[16px] 2xl:m-6">
        {t("or")}
      </div>
    </div>
  );
};

export default Separator;
