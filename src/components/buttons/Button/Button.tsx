import cn from "classnames";

import { ButtonProps } from "./Button.props";

export const Button = ({
  variant = "accent",
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex min-w-[260px] items-center justify-center rounded-xl px-8 py-3 font-nunito text-xl font-normal duration-300",
        className,
        // { ['w-[140px]']: size == 'small', ['w-[214px]']: size == 'big' },

        !disabled && {
          ["text-grey-0 bg-accent-primary hover:bg-accent-hover focus:bg-accent-pressed"]:
            variant == "accent",

          ["ring-grey-70 text-grey-80 hover:shadow-button_hover focus:shadow-button_hover bg-white ring-1 ring-inset hover:text-accent-hover hover:ring-[3px] hover:ring-accent-primary focus:ring-[3px] focus:ring-accent-primary"]:
            variant == "white",
        },
        disabled && {
          ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["bg-grey-100 pointer-events-none text-white ring-transparent"]:
            variant == "white",
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
};
