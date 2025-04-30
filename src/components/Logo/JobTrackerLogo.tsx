import { Link } from "react-router-dom";

import { cn } from "@/utils/utils";
import JobTrackerLogo from "../../assets/Logo.svg";

function Logo({ className }: { className: string }) {
  return (
    <Link to="/">
      <img
        className={
          (cn(
            "h-[26px] w-[47px]",
            "md:h-[52px] md:w-[94px]",
            "xl:h-[42px] xl:w-[84px]",
            "2lx:w-[94px] 2xl:h-[52px]",
            "custom-hover hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
          ),
          className)
        }
        src={JobTrackerLogo}
        alt="logo"
      />
    </Link>
  );
}

export default Logo;
