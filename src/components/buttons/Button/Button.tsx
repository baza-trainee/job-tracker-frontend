import { cn } from "../../../utils/utils";
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
        "flex h-[50px] items-center justify-center rounded-xl font-nunito text-xl font-medium text-text-primary duration-300",
        {
          ["h-[44px] min-w-[180px] px-8"]: size == "small",
          ["min-w-[260px] px-12"]: size == "big",
        },

        !disabled && {
          ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
            variant == "accent",

          ["bg-transparent ring-1 ring-inset ring-text-primary hover:shadow-button_hover hover:ring-[3px] hover:ring-accent focus:shadow-button_hover focus:ring-[3px] focus:ring-accent"]:
            variant == "ghost",
        },
        disabled && {
          ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "accent",
          ["pointer-events-none bg-background-sidebar ring-transparent"]:
            variant == "ghost",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
