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
        "flex sm:h-[42px] md:h-[50px] items-center justify-center rounded-xl border-[1px] border-textBlack font-nunito text-xl font-medium text-textBlack duration-300",

        size === "small" && "sm:px-[14px] md:px-4 xl:px-8",
        size === "big" && "sm:px-[30px] md:px-12",

        !disabled &&
          variant === "accent" &&
          "bg-button hover:border-iconHover hover:bg-backgroundSecondary active:border-iconHover active:bg-iconHover active:fill-textWhite active:text-textWhite",

        !disabled &&
          variant === "ghost" &&
          "relative bg-transparent hover:border-iconHover hover:bg-backgroundSecondary active:border-transparent active:bg-transparent active:ring-[2px] active:ring-inset active:ring-iconHover",

        disabled &&
          variant === "accent" &&
          "pointer-events-none border-transparent bg-backgroundSecondary text-color6",

        disabled &&
          variant === "ghost" &&
          "pointer-events-none border-transparent bg-backgroundSecondary text-color6 ring-transparent",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
