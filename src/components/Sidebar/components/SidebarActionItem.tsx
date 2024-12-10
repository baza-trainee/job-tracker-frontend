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
        "fill-text-primary flex h-[43px] cursor-pointer items-center gap-2 rounded-xl border-[1px]",
        "custom-transition",
        isOpen ? "w-[206px]" : "w-[68px]",
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
            : "sr-only w-0 -translate-x-5 opacity-0"
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default SidebarActionItem;
