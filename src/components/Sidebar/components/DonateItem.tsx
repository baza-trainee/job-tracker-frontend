import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { DonateItemProps } from "./Sidebar.props.ts";

const DonateItem: React.FC<DonateItemProps> = ({ icon, title, isOpen }) => {
  return (
    <div
      className={cn(
        "fill-text-primary flex cursor-pointer items-center justify-center gap-2 rounded-xl border-[1px] border-textBlack bg-button px-3 py-2 transition-all duration-500 ease-in-out hover:fill-iconHover hover:text-iconHover",
        isOpen ? "w-[206px]" : "w-[68px]"
      )}
    >
      <Icon id={icon} className="h-6 w-6" />
      <span
        className={`${isOpen ? "visible" : "sr-only"}`}
        // className={cn(
        //   "transition-all duration-500 ease-in-out",
        //   isOpen
        //     ? "visible w-[148px] opacity-100"
        //     : "sr-only w-0 -translate-x-10 opacity-0"
        // )}
      >
        {title}
      </span>
    </div>
  );
};

export default DonateItem;
