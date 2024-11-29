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
        "flex rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD] transition-all duration-500 ease-in-out",
        isOpen ? "w-[108px]" : "w-[68px]"
      )}
    >
      {isOpen ? (
        <>
          <button
            disabled={!darkMode}
            onClick={handleThemeToggle}
            className={cn(
              "px-2 py-[6px]",
              !darkMode && "rounded-[20px] bg-white px-5"
            )}
            type="button"
          >
            <Icon id="day-mode" className="h-6 w-6" />
          </button>
          <button
            disabled={darkMode}
            onClick={handleThemeToggle}
            className={cn(
              "px-2 py-[6px]",
              darkMode && "rounded-[20px] bg-white pl-6 pr-4"
            )}
            type="button"
          >
            <Icon id="night-mode" className="h-6 w-6" />
          </button>
        </>
      ) : (
        <>
          {
            <button
              onClick={handleThemeToggle}
              className="w-[68px] rounded-[20px] bg-white px-5 py-[7px] text-center transition-colors hover:fill-iconHover"
              type="button"
            >
              <Icon
                id={`${darkMode ? "night-mode" : "day-mode"}`}
                className="h-6 w-6"
              />
            </button>
          }
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
