import Icon from "../Icon/Icon";
import { selectTheme } from "../../store/slices/themeSlice/themeSelector";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { toggleTheme } from "../../store/slices/themeSlice/themeSlice";

const ThemeToggle = () => {
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  console.log("darkMode", darkMode);
  return (
    // <div className="flex w-fit cursor-pointer rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
    //   <div className="rounded-[20px] bg-white px-[14px] py-[6px]">
    //     <Icon id="day-mode" className="h-6 w-6" />
    //   </div>
    //   <div className="px-2 py-[6px] pl-3">
    //     <Icon id="night-mode" className="h-6 w-6" />
    //   </div>
    // </div>
    <div className="flex w-fit rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
      <button
        disabled={!darkMode}
        onClick={() => handleThemeToggle()}
        className="px-3 py-[6px] disabled:rounded-[20px] disabled:bg-white"
        type="button"
      >
        <Icon id="day-mode" className="h-6 w-6" />
      </button>
      <button
        disabled={darkMode}
        onClick={() => handleThemeToggle()}
        className="px-3 py-[6px] disabled:rounded-[20px] disabled:bg-white"
        type="button"
      >
        <Icon id="night-mode" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ThemeToggle;
