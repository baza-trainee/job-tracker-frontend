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
        "relative flex h-[36px] items-center rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD] md:h-[39px]",
        "custom-transition lead font-medium leading-[132%] text-textBlack",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      <button
        disabled={isUA && isOpen}
        onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
        className={cn(
          "flex overflow-hidden px-3 py-[5px] hover:text-iconHover disabled:hover:text-textBlack md:px-2 md:py-1",
          {
            "visible absolute left-0 z-[2] w-16 justify-center rounded-[20px] bg-backgroundMain opacity-100":
              isUA,
            "flex-grow opacity-100": !isUA && isOpen,
            "sr-only m-0 w-0 opacity-0": !isUA && !isOpen,
          }
        )}
        type="button"
      >
        <span
          className={cn("duration-1000", {
            "opacity-0": !isUA && !isOpen,
            "opacity-100": !isUA && isOpen,
          })}
        >
          UA
        </span>
      </button>
      <button
        disabled={!isUA && isOpen}
        onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
        className={cn(
          "flex justify-end overflow-hidden px-2 py-[5px] hover:text-iconHover disabled:hover:text-textBlack md:py-1",

          {
            "visible absolute right-0 w-16 justify-center rounded-[20px] bg-backgroundMain opacity-100":
              !isUA,
            "flex-grow opacity-100": isUA && isOpen,
            "sr-only m-0 w-0 opacity-0": isUA && !isOpen,
          }
        )}
        type="button"
      >
        <span
          className={cn("duration-1000", {
            "opacity-0": isUA && !isOpen,
            "opacity-100": isUA && isOpen,
          })}
        >
          EN
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
