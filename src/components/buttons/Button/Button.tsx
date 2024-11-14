import cn from "clsx"

import { ButtonProps } from "./Button.props";

export const Button = ({
  variant = "ghost",
  disabled = false,
  children,
  className,
  size = "small",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "text-text-primary flex h-[50px] items-center justify-center rounded-xl py-3 font-nunito text-xl font-medium duration-300",
        className,
        {
          ["min-w-[180px] px-8 h-[44px]"]: size == "small",
          ["min-w-[260px] px-12"]: size == "big",
        },

        !disabled && {
          ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
            variant == "accent",

          ["ring-text-primary hover:ring-accent focus:ring-accent bg-transparent ring-1 ring-inset hover:shadow-button_hover hover:ring-[3px] focus:shadow-button_hover focus:ring-[3px]"]:
            variant == "ghost",
        },
        disabled && {
          ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["bg-background-sidebar pointer-events-none ring-transparent"]:
            variant == "ghost",
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
};
