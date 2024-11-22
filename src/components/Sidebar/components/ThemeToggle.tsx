import Icon from "../../Icon/Icon";
import { selectTheme } from "../../../store/slices/themeSlice/themeSelector";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { toggleTheme } from "../../../store/slices/themeSlice/themeSlice";
import { ToggleProps } from "./Sidebar.props";

const ThemeToggle: React.FC<ToggleProps> = ({ isOpen }) => {
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex w-fit rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
      {isOpen ? (
        <>
          <button
            disabled={!darkMode}
            onClick={handleThemeToggle}
            className="px-3 py-[6px] disabled:rounded-[20px] disabled:bg-white"
            type="button"
          >
            <Icon id="day-mode" className="h-6 w-6" />
          </button>
          <button
            disabled={darkMode}
            onClick={handleThemeToggle}
            className="px-3 py-[6px] disabled:rounded-[20px] disabled:bg-white"
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
              className="w-14 rounded-[20px] bg-white px-4 py-[6px] transition-colors hover:fill-iconHover"
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
