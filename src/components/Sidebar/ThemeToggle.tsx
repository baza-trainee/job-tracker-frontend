import Icon from "../Icon/Icon";

const ThemeToggle = () => {
  return (
    <div className="flex w-fit cursor-pointer rounded-[20px] border-2 border-[#DBDCDD] bg-[#DBDCDD]">
      <div className="rounded-[20px] bg-white px-[14px] py-[6px]">
        <Icon id="day-mode" className="h-6 w-6" />
      </div>
      <div className="px-2 py-[6px] pl-3">
        <Icon id="night-mode" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default ThemeToggle;
