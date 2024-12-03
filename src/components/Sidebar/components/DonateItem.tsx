import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { DonateItemProps } from "./Sidebar.props.ts";

const DonateItem: React.FC<DonateItemProps> = ({ icon, title, isOpen }) => {
  return (
    <div
      className={cn(
        "fill-text-primary flex h-[43px] cursor-pointer items-center gap-2 rounded-xl border-[1px] border-textBlack bg-button px-3 hover:fill-iconHover hover:text-iconHover",
        "custom-transition",
        isOpen ? "w-[206px]" : "w-[68px] pl-[22px]"
      )}
    >
      <Icon id={icon} className="h-6 w-6" />
      <span
        className={cn(
          "custom-size overflow-hidden whitespace-nowrap",
          isOpen
            ? "visible w-[148px] opacity-100"
            : "sr-only w-0 -translate-x-5 opacity-0"
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default DonateItem;
