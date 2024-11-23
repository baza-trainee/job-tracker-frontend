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
        "flex h-[50px] items-center justify-center rounded-xl font-nunito text-xl font-medium text-textBlack duration-300",

        size === "small" && "h-[44px] min-w-[180px] px-8",
        size === "big" && "min-w-[260px] px-12",

        !disabled &&
          variant === "accent" &&
          "text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary",

        !disabled &&
          variant === "ghost" &&
          "bg-transparent ring-1 ring-inset ring-textBlack hover:shadow-button_hover hover:ring-[3px] hover:ring-accent focus:shadow-button_hover focus:ring-[3px] focus:ring-accent",

        disabled &&
          variant === "accent" &&
          "bg-grey-40 text-grey-0 pointer-events-none",

        disabled &&
          variant === "ghost" &&
          "pointer-events-none bg-background-backgroundSecondary ring-transparent",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
