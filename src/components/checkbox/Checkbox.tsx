import classNames from "clsx";
import { CheckboxProps } from "./Checkbox.props";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      label,
      id,
      errors,
      type = "default",
      register,
      checked,
      disabled = false,
      required = false,
      onFocus,
      ...props
    },
    ref
  ) => {
    const error = errors[name];
    const { t } = useTranslation();
    const registerProps = register(name);

    return (
      <div>
        <div
          className={classNames(
            type === "signUp" && "relative flex items-center 3xl:px-[9.5px]"
          )}
          // id={id}
        >
          <div className="relative flex items-center justify-center">
            <input
              required={required}
              type="checkbox"
              id={id}
              disabled={disabled}
              {...register(name)}
              aria-describedby={`checkBoxError-${name}`}
              {...props}
              checked={checked}
              className={classNames(
                type === "signUp" &&
                  "peer relative h-5 w-5 shrink-0 cursor-pointer appearance-none",
                "md:h-6 md:w-6 md:border-2",
                "rounded-[4px] border-[1px] border-solid border-textBlack focus:border-textOther focus:outline-none"
              )}
              onFocus={onFocus}
              ref={(el) => {
                registerProps.ref(el);
                if (ref && typeof ref === "function") {
                  ref(el);
                }
              }}
            />
            {type === "signUp" && (
              <svg
                className="pointer-events-none absolute h-4 w-4 fill-none stroke-none peer-checked:stroke-textOther"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>

          <label
            htmlFor={id}
            className={classNames(
              type === "signUp" &&
                "ml-3 font-nunito text-[14px] font-medium leading-[135%] text-textBlack md:text-[16px]"
            )}
          >
            {label}
          </label>
        </div>
        {error && (
          <span
            id={`inputError-${name}`}
            className={classNames(
              "text-redColor inline-block font-nunito font-medium",
              "sm:text-[12px]",
              "md:text-[14px]",
              "2xl:text-[16px]"
            )}
          >
            {t(String(error?.message))}
          </span>
        )}
      </div>
    );
  }
);

export default Checkbox;
