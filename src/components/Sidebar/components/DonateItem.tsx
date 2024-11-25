import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { DonateItemProps } from "./Sidebar.props.ts";

const DonateItem: React.FC<DonateItemProps> = ({ icon, title, isOpen }) => {
  return (
    <div
      className={cn(
        "flex w-fit cursor-pointer items-center gap-2 rounded-xl border-[1px] border-[#525252] bg-white fill-text-primary px-6 py-2 transition hover:fill-iconHover hover:text-iconHover",
        !isOpen && "pl-4 pr-4"
      )}
    >
      <Icon id={icon} className="h-6 w-6" />
      <span className={`${isOpen ? "visible" : "sr-only"} w-[148px]`}>
        {title}
      </span>
    </div>
  );
};

export default DonateItem;
