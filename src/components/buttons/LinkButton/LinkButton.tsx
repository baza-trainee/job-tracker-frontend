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
        "inline-flex h-[50px] items-center justify-center rounded-xl py-3 font-nunito text-xl font-medium text-textBlack duration-300",
        {
          ["min-w-[180px] px-8"]: size == "small",
          ["min-w-[260px] px-12"]: size == "big",
        },

        !disabled && {
          // ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
          //   variant == "accent",

          ["bg-transparent ring-1 ring-inset ring-textBlack hover:shadow-button_hover hover:ring-[3px] hover:ring-accent focus:shadow-button_hover focus:ring-[3px] focus:ring-accent"]:
            variant == "ghost",
        },
        disabled && {
          // ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["pointer-events-none bg-background-backgroundSecondary ring-transparent"]:
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
