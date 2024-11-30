import Icon from "../../Icon/Icon";
import { selectTheme } from "../../../store/slices/themeSlice/themeSelector";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { toggleTheme } from "../../../store/slices/themeSlice/themeSlice";
import { ToggleProps } from "./Sidebar.props";
import cn from "clsx";

const ThemeToggle: React.FC<ToggleProps> = ({ isOpen }) => {
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={cn(
        "flex h-[39px] rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]",
        "custom-hover custom-size",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      <button
        disabled={!darkMode && isOpen}
        onClick={handleThemeToggle}
        className={cn(
          "overflow-hidden fill-textBlack px-2 py-[6px] hover:fill-iconHover disabled:hover:fill-textBlack",
          {
            "visible w-16 rounded-[20px] bg-white px-5 text-center opacity-100":
              !darkMode, // Відкрита тема
            "w-10 opacity-100": darkMode && isOpen, // Закрита тема
            "sr-only w-0 opacity-0": darkMode && !isOpen, // Схована кнопка
          }
        )}
        type="button"
      >
        <Icon id="day-mode" className="h-6 w-6" />
      </button>
      <button
        disabled={darkMode && isOpen}
        onClick={handleThemeToggle}
        className={cn(
          "overflow-hidden fill-textBlack px-2 py-[6px] hover:fill-iconHover disabled:hover:fill-textBlack",

          {
            "visible w-16 rounded-[20px] bg-white px-5 text-center opacity-100":
              darkMode, // Відкрита тема
            "w-10 opacity-100": !darkMode && isOpen, // Закрита тема
            "sr-only w-0 opacity-0": !darkMode && !isOpen, // Схована кнопка
          }
        )}
        type="button"
      >
        <Icon id="night-mode" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ThemeToggle;
