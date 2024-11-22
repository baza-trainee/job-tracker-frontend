import { LOCALS } from "../../utils/i18n/constns";
// import i18next from "i18next";
// import i18n from "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  return (
    <div className="flex w-fit rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
      <button
        disabled={i18n.language === LOCALS.UA}
        onClick={() => i18n.changeLanguage(LOCALS.UA)}
        className="px-[10px] py-1 disabled:rounded-[20px] disabled:bg-white"
        type="button"
      >
        UA
      </button>
      <button
        disabled={i18n.language === LOCALS.EN}
        onClick={() => i18n.changeLanguage(LOCALS.EN)}
        className="px-[10px] py-1 disabled:rounded-[20px] disabled:bg-white"
        type="button"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
