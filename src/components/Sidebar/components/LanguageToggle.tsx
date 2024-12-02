import { LOCALS } from "../../../utils/i18n/constns";
import { useTranslation } from "react-i18next";
import { ToggleProps } from "./Sidebar.props";
import cn from "clsx";

const LanguageToggle: React.FC<ToggleProps> = ({ isOpen }) => {
  const { i18n } = useTranslation();
  const isUA = i18n.language === LOCALS.UA;

  return (
    <div
      className={cn(
        "flex h-[39px] rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]",
        "custom-hover custom-size text-textBlack",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      <button
        disabled={isUA && isOpen}
        onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
        className={cn(
          "overflow-hidden py-1 hover:text-iconHover disabled:hover:text-textBlack",
          {
            "relative w-16 rounded-[20px] bg-backgroundMain px-[10px] opacity-100":
              isUA,
            "w-10 opacity-100": !isUA && isOpen,
            "w-0 opacity-0": !isUA && !isOpen,
          }
        )}
        type="button"
      >
        UA
      </button>
      <button
        disabled={!isUA && isOpen}
        onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
        className={cn(
          "overflow-hidden py-1 hover:text-iconHover disabled:hover:text-textBlack",

          {
            "relative w-16 rounded-[20px] bg-backgroundMain px-[10px] opacity-100":
              !isUA,
            "w-10 opacity-100": isUA && isOpen,
            "w-0 opacity-0": isUA && !isOpen,
          }
        )}
        type="button"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
