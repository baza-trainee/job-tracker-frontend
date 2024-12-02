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

        size === "small" && "px-8",
        size === "big" && "h-[51px] px-12",

        !disabled &&
          variant === "accent" &&
          "text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary",

        !disabled &&
          variant === "ghost" &&
          "border-[1px] border-[solid] border-iconHover bg-transperent hover:border-textBlack hover:bg-[#bfdef5] active:border-none active:bg-iconHover active:text-textWhite",

        disabled &&
          variant === "accent" &&
          "bg-grey-40 text-grey-0 pointer-events-none",

        disabled &&
          variant === "ghost" &&
          "bg-backgroundSecondary pointer-events-none ring-transparent",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
