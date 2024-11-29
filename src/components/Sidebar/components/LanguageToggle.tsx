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
        "custom-hover custom-size",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      {/* {isOpen ? (
        <> */}
      <button
        disabled={isUA}
        onClick={() => i18n.changeLanguage(LOCALS.UA)}
        className={cn(
          "py-1",
          isUA
            ? "w-16 rounded-[20px] bg-white px-[10px] opacity-100"
            : isOpen
              ? "w-[43px] hover:text-iconHover"
              : "w-0 overflow-hidden opacity-0"
        )}
        type="button"
      >
        UA
      </button>
      <button
        disabled={!isUA}
        onClick={() => i18n.changeLanguage(LOCALS.EN)}
        className={cn(
          "py-1",
          !isUA
            ? "visible w-16 rounded-[20px] bg-white px-[17px] opacity-100"
            : isOpen
              ? "w-[43px] hover:text-iconHover"
              : "w-0 overflow-hidden opacity-0"
        )}
        type="button"
      >
        EN
      </button>
      {/* </>
      ) : (
        <>
          <button
            onClick={() => i18n.changeLanguage(isUA ? LOCALS.EN : LOCALS.UA)}
            className="w-[68px] rounded-[20px] bg-white px-[10px] py-[5px] transition-colors hover:text-iconHover"
            type="button"
          >
            {isUA ? "UA" : "EN"}
          </button>
        </>
      )} */}
    </div>
  );
};

export default LanguageToggle;
