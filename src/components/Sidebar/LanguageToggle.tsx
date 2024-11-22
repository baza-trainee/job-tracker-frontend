import { LOCALS } from "../../utils/i18n/constns";
import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  isOpen: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ isOpen }) => {
  const { i18n } = useTranslation();
  const isUA = i18n.language === LOCALS.UA;

  return (
    <div className="flex w-fit rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
      {isOpen ? (
        <>
          <button
            disabled={isUA}
            onClick={() => i18n.changeLanguage(LOCALS.UA)}
            className={`px-[10px] py-1 disabled:rounded-[20px] disabled:bg-white`}
            type="button"
          >
            UA
          </button>
          <button
            disabled={!isUA}
            onClick={() => i18n.changeLanguage(LOCALS.EN)}
            className="px-[10px] py-1 disabled:rounded-[20px] disabled:bg-white"
            type="button"
          >
            EN
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
            className="w-12 rounded-[20px] bg-white px-[10px] py-1"
            type="button"
          >
            {isUA ? "UA" : "EN"}
          </button>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;
