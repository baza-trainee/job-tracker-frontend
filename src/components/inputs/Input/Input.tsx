import cn from "clsx";
import { InputProps } from "./Input.props";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../Icon/Icon";

export const Input = ({
  name,
  placeholder,
  label,
  className,
  type = "text",
  register,
  resetField,
  errors,
  value,
  id,
}: InputProps) => {
  const error = errors[name];
  const [isIcon, setIsIcon] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleResetField = (name: string) => {
    resetField(name);
  };

  return (
    <div
      className={cn("relative", [className])}
      id={id}
      onFocus={() => setIsIcon(true)}
      onBlur={() => setIsIcon(false)}
    >
      {label && (
        <label
          htmlFor={`input-${name}`}
          className={cn(
            "mb-3 block font-nunito font-medium leading-[135%] text-textBlack sm:text-[14px] md:text-[18px]",
            "sm:mb-[2px] sm:text-[14px]",
            "md:mb-2 md:text-[18px]",
            "xl:mb-2 xl:text-[16px]",
            "2xl:mb-3 2xl:text-[20px]"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className={"relative flex w-full items-center"}>
          <input
            id={`input-${name}`}
            className={cn(
              "peer w-full rounded-xl border font-nunito text-base font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight placeholder-shown:border-textBlack focus:border-textOther focus:outline-none active:border-textOther",
              "sm:h-[34px] sm:px-4 sm:py-2 sm:text-[12px]",
              "md:h-11 md:px-6 md:py-3 md:text-[14px]",
              "xl:text-[14px]",
              "2xl:text-[16px]",
              !error && "border-color5",
              error &&
                "border-color2 placeholder-shown:border-color2 focus:border-color2 active:border-color2"
            )}
            placeholder={placeholder}
            type={type}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`inputError-${name}`}
          />
          {error ? (
            <button
              onClick={() => handleResetField(name)}
              className={
                "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer"
              }
            >
              <Icon id="cancel-in-round" className="h-6 w-6 fill-color2" />
            </button>
          ) : (
            !isIcon && (
              <div
                className={
                  "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] peer-placeholder-shown:hidden"
                }
              >
                <Icon id="check-box" className="h-6 w-6 fill-color5" />
              </div>
            )
          )}
        </div>
        {error && (
          <span
            id={`inputError-${name}`}
            className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-color2"
          >
            {t(String(error?.message))}
          </span>
        )}
      </div>
    </div>
  );
};
