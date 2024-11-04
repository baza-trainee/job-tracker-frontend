import cn from "classnames";

import { Link } from "react-router-dom";
import { LinkButtonProps } from "./LinkButton.props";

export const LinkButton = ({
  variant = "accent",
  disabled = false,
  // size = "big",
  href,
  children,
  className,

  ...props
}: LinkButtonProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex min-w-[260px] items-center justify-center rounded-xl px-8 py-3 font-nunito text-xl font-normal duration-300",
        className,
        // { ['w-[140px]']: size == 'small', ['w-[214px]']: size == 'big' },

        !disabled && {
          ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
            variant == "accent",

          ["hover:text-accent-hover bg-white text-grey-80 ring-1 ring-inset ring-grey-70 hover:shadow-button_hover hover:ring-[3px] hover:ring-accent-primary focus:shadow-button_hover focus:ring-[3px] focus:ring-accent-primary"]:
            variant == "white",
        },
        disabled && {
          ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["pointer-events-none bg-grey-100 text-white ring-transparent"]:
            variant == "white",
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
