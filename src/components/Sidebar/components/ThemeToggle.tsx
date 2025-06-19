import cn from "clsx";

import { selectTheme } from "../../../store/slices/themeSlice/themeSelector";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { toggleTheme } from "../../../store/slices/themeSlice/themeSlice";

import { ToggleProps } from "./Sidebar.props";
import Icon from "../../Icon/Icon";

const ThemeToggle: React.FC<ToggleProps> = ({ isOpen }) => {
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={cn(
        "relative flex h-9 rounded-[20px] border-2 border-color9 bg-color9 dark:border-textBlack dark:bg-textBlack md:h-[39px]",
        "custom-transition",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      <button
        disabled={!darkMode && isOpen}
        onClick={handleThemeToggle}
        className={cn(
          "overflow-hidden fill-blackColor px-2 py-1 hover:fill-iconHover disabled:hover:fill-textBlack dark:fill-textWhite md:py-[5.5px]",
          {
            "visible absolute left-0 z-[2] w-16 rounded-[20px] bg-backgroundMain px-5 text-center opacity-100":
              !darkMode,
            "flex-grow opacity-100": darkMode && isOpen,
            "sr-only m-0 w-0 opacity-0": darkMode && !isOpen,
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
          "flex items-center justify-end overflow-hidden fill-textBlack px-2 py-1 hover:fill-iconHover disabled:hover:fill-textBlack md:py-[5.5px]",

          {
            "visible absolute right-0 w-16 rounded-[20px] bg-backgroundTertiary fill-textBlack px-5 text-center opacity-100":
              darkMode,
            "flex-grow opacity-100": !darkMode && isOpen,
            "sr-only m-0 w-0 opacity-0": !darkMode && !isOpen,
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
