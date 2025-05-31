import { cn } from "../../../utils/utils";

import { Link } from "react-router-dom";
import { LinkButtonProps } from "./LinkButton.props";

export const LinkButton = ({
  variant = "ghost",
  disabled = false,
  size = "small",
  href,
  children,
  className,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "inline-flex h-[51px] items-center justify-center rounded-xl fill-textBlack py-3 font-nunito text-xl font-medium text-textBlack duration-300 active:fill-textBlack dark:hover:fill-blackColor dark:active:fill-textBlack dark:active:text-textBlack",
        {
          ["min-w-[180px] px-8"]: size == "small",
          ["min-w-[260px] px-12"]: size == "big",
        },

        !disabled && {
          // ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
          //   variant == "accent",

          ["group border-[1px] border-textBlack bg-transparent hover:border-iconHover hover:bg-backgroundSecondary active:border-transparent active:bg-transparent active:ring-[2px] active:ring-inset active:ring-iconHover dark:hover:text-blackColor"]:
            variant == "ghost",
        },
        disabled && {
          // ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["bg-background-backgroundSecondary group pointer-events-none ring-transparent"]:
            variant == "ghost",
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
