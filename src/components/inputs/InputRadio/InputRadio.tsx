import classNames from "clsx";
import { InputRadioProps } from "./InputRadio.props";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

export const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(
  (
    {
      name,
      label,
      id,
      errors,
      register,
      disabled = false,
      required = false,
      className,
      onFocus,
      ...props
    },
    ref
  ) => {
    const error = errors[name];
    const { t } = useTranslation();

    const registerProps = register(name);

    return (
      <div
        className={classNames(
          className === "addVacancy" && "flex items-center 2xl:px-[9.5px]"
        )}
      >
        <div className="flex items-center justify-center">
          <input
            required={required}
            type="radio"
            id={id}
            disabled={disabled}
            {...register(name)}
            aria-describedby={`radioError-${name}`}
            {...props}
            className={classNames(
              className === "addVacancy" &&
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
          {className === "addVacancy" && (
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
            className === "addVacancy" &&
              "ml-3 cursor-pointer font-nunito text-[14px] font-medium leading-[135%] text-textBlack md:text-[16px]"
          )}
        >
          {label}
        </label>
        {error && (
          <span
            id={`inputError-${name}`}
            className="text-redColor absolute left-0 top-[46px] inline-block font-nunito text-base font-medium"
          >
            {t(String(error?.message))}
          </span>
        )}
      </div>
    );
  }
);

export default InputRadio;
