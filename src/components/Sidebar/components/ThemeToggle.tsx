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
        "relative flex h-[39px] rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]",
        "custom-transition",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      <button
        disabled={!darkMode && isOpen}
        onClick={handleThemeToggle}
        className={cn(
          "overflow-hidden fill-textBlack px-2 py-[6px] hover:fill-iconHover disabled:hover:fill-textBlack",
          {
            "visible absolute left-0 z-[2] w-16 rounded-[20px] bg-backgroundMain px-5 text-center opacity-100":
              !darkMode, // Відкрита тема
            "flex-grow opacity-100": darkMode && isOpen, // Закрита тема
            "sr-only m-0 w-0 opacity-0": darkMode && !isOpen, // Схована кнопка
          }
        )}
        type="button"
      >
        <Icon
          id="day-mode"
          className={cn("h-6 w-6 duration-1000", {
            "opacity-0": darkMode && !isOpen,
            "opacity-100": darkMode && isOpen,
          })}
        />
      </button>
      <button
        disabled={darkMode && isOpen}
        onClick={handleThemeToggle}
        className={cn(
          "flex justify-end overflow-hidden fill-textBlack px-2 py-[6px] hover:fill-iconHover disabled:hover:fill-textBlack",

          {
            "visible absolute right-0 w-16 rounded-[20px] bg-backgroundMain px-5 text-center opacity-100":
              darkMode, // Відкрита тема
            "flex-grow opacity-100": !darkMode && isOpen, // Закрита тема
            "sr-only m-0 w-0 opacity-0": !darkMode && !isOpen, // Схована кнопка
          }
        )}
        type="button"
      >
        <Icon
          id="night-mode"
          className={cn("h-6 w-6 duration-1000", {
            "opacity-0": !darkMode && !isOpen,
            "opacity-100": !darkMode && isOpen,
          })}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
