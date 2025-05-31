import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { SidebarActionItemProps } from "./Sidebar.props.ts";

const SidebarActionItem: React.FC<SidebarActionItemProps> = ({
  icon,
  title,
  isOpen,
  className,
  donateIcon,
  action,
}) => {
  return (
    <div
      className={cn(
        "group flex h-[43px] cursor-pointer items-center gap-2 rounded-xl border-[1px] hover:border-iconHover",
        "custom-transition fill-textBlack text-textBlack dark:hover:fill-blackColor dark:hover:text-blackColor dark:active:fill-textBlack dark:active:text-textBlack",
        isOpen ? "w-[206px]" : "w-[68px]",
        donateIcon ? "active:fill-whiteColor active:text-whiteColor" : "",
        className
      )}
      onClick={action}
    >
      <Icon
        id={icon}
        className={cn(
          "custom-size",
          donateIcon ? "h-6 w-6" : "h-8 w-8",
          !isOpen && "ml-[18px]",
          !isOpen && donateIcon && "ml-[10px]"
        )}
      />
      <span
        className={cn(
          "custom-size overflow-hidden whitespace-nowrap",
          isOpen
            ? "visible w-[148px] opacity-100"
            : "sr-only m-0 w-0 -translate-x-5 opacity-0"
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default SidebarActionItem;
