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
        "flex h-[42px] items-center justify-center rounded-xl border-[1px] border-textBlack font-nunito text-xl font-medium duration-300 md:h-[50px]",
        "fill-textBlack text-textBlack dark:hover:fill-blackColor dark:hover:text-blackColor dark:active:fill-whiteColor dark:active:text-whiteColor",

        size === "small" && "px-[14px] md:px-8 xl:px-8",
        size === "big" && "px-[30px] md:px-10",

        !disabled &&
          variant === "accent" &&
          "TEST group bg-button hover:border-iconHover hover:bg-backgroundSecondary active:border-iconHover active:bg-iconHover active:fill-whiteColor active:text-whiteColor",

        !disabled &&
          variant === "ghost" &&
          "group relative bg-transparent hover:border-iconHover hover:bg-backgroundSecondary active:border-transparent active:bg-transparent active:ring-[2px] active:ring-inset active:ring-iconHover",

        disabled &&
          variant === "accent" &&
          "group pointer-events-none border-transparent bg-backgroundSecondary text-color6 dark:text-color6-transparent",

        disabled &&
          variant === "ghost" &&
          "group pointer-events-none border-transparent bg-backgroundSecondary text-color6 ring-transparent dark:text-color6-transparent",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
