import { cn } from "../../../utils/utils";
import { IconButtonProps } from "./IconButton.props";

export const IconButton = ({
  variant = "default",
  className,
  label,
  children,
  disabled = false,
  type = "button",

  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-2xl fill-textBlack px-3 py-1 text-textBlack transition hover:fill-iconHover active:fill-iconHover",
        !disabled && {
          //   ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
          //     variant == "filled",

          ["hover:ring-accent focus:ring-accent bg-whiteColor ring-1 ring-inset ring-textBlackLight hover:shadow-button_hover hover:ring-[3px] focus:shadow-button_hover focus:ring-[3px]"]:
            variant == "outline",
        },
        disabled && {
          //   ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "filled",
          ["bg-background-backgroundSecondary pointer-events-none ring-transparent"]:
            variant == "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
