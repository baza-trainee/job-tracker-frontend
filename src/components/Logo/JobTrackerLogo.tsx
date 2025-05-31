import { Link } from "react-router-dom";

import { cn } from "@/utils/utils";
// import JobTrackerLogo from "../../assets/Logo.svg";
import Icon from "../Icon/Icon.tsx";

function Logo({ className }: { className: string }) {
  return (
    <Link to="/">
      <Icon
        id="logo"
        className={cn(
          "custom-hover h-[26px] w-[48px]",
          "md:h-[52px] md:w-[96px]",
          "xl:h-[42px] xl:w-[86px]",
          "2lx:w-[96px] 2xl:h-[52px]",
          "fill-textBlack hover:fill-iconHover active:fill-iconHover dark:hover:fill-iconHover",
          className
        )}
      />
      {/* <img
        className={
          (cn(
            "h-[26px] w-[47px]",
            "md:h-[52px] md:w-[94px]",
            "xl:h-[42px] xl:w-[84px]",
            "2lx:w-[94px] 2xl:h-[52px]",
            "custom-hover fill-black hover:fill-iconHover dark:hover:fill-iconHover",
          className))
        }
        src={JobTrackerLogo}
        alt="logo"
      /> */}
    </Link>
  );
}

export default Logo;
