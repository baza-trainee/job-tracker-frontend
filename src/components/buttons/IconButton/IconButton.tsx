import cn from "classnames";

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
        "flex items-center justify-center rounded-2xl px-3 py-1 text-grey-70",
        !disabled && {
          //   ["text-grey-0 hover:bg-accent-hover focus:bg-accent-pressed bg-accent-primary"]:
          //     variant == "filled",

          ["hover:text-accent-hover bg-white text-grey-80 ring-1 ring-inset ring-grey-70 hover:shadow-button_hover hover:ring-[3px] hover:ring-accent-primary focus:shadow-button_hover focus:ring-[3px] focus:ring-accent-primary"]:
            variant == "outline",
        },
        disabled && {
          //   ["bg-grey-40 text-grey-0 pointer-events-none"]: variant == "filled",
          ["pointer-events-none bg-grey-100 text-white ring-transparent"]:
            variant == "outline",
        },

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
