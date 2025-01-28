import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/utils";
import { InputProps } from "./Input.props";
import Icon from "@/components/Icon/Icon";

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
  isButtonCopy = false,
  isButtonRemoveInput = false,
  handleClickButtonRemoveInput,
  handleClickButtonCopyInput,
  isCheckButtons,
  isRequired,
  promptMessage = "",
}: InputProps) => {
  const error = errors[name];
  const [isIcon, setIsIcon] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleResetField = (name: string) => {
    resetField(name);
  };

  return (
    <div
      className={cn("relative", className)}
      id={id}
      onFocus={() => setIsIcon(true)}
      onBlur={() => setIsIcon(false)}
    >
      {label && (
        <label
          htmlFor={`input-${name}`}
          className={cn(
            "responsive-design mb-3 block font-nunito font-medium leading-[135%] text-textBlack",
            "sm:mb-[2px] sm:text-[14px]",
            "md:mb-2 md:text-[18px]",
            "xl:mb-2 xl:text-[16px]",
            "2xl:mb-3 2xl:text-[20px]"
          )}
        >
          {label} {isRequired && <span className={cn("text-color2")}>*</span>}
        </label>
      )}
      <div className="relative">
        <div className={cn("relative flex w-full items-center")}>
          <input
            id={`input-${name}`}
            className={cn(
              "active:border-accent responsive-input peer w-full rounded-xl border font-nunito text-base font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight placeholder-shown:border-textBlack focus-within:border-textOther focus:outline-none",
              "sm:h-[34px] sm:px-4 sm:py-2 sm:pr-16 sm:text-[12px]",
              "md:h-11 md:px-6 md:py-3 md:text-[14px]",
              "xl:text-[14px]",
              "2xl:text-[16px]",
              {
                ["border-color5"]: !error,
                ["border-color2 placeholder-shown:border-color2 focus:border-color2 active:border-color2"]:
                  error,
              }
            )}
            placeholder={placeholder}
            type={type}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`inputError-${name}`}
            title={promptMessage}
          />
          <div className="flex gap-2">
            {isButtonCopy && (
              <button
                type="button"
                aria-label="copy text"
                onClick={handleClickButtonCopyInput}
              >
                <Icon
                  id="copy"
                  className="h-6 w-6 fill-black transition-all hover:fill-green-500"
                />
              </button>
            )}
            {isButtonRemoveInput && (
              <button
                type="button"
                aria-label="remove field"
                onClick={handleClickButtonRemoveInput}
              >
                <Icon
                  id="close-default"
                  className="h-6 w-6 fill-black transition-all hover:fill-color2"
                />
              </button>
            )}
            {isCheckButtons ? (
              error ? (
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
                      "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer"
                    }
                  >
                    <Icon id="check-box" className="h-6 w-6 fill-color5" />
                  </div>
                )
              )
            ) : null}
          </div>
        </div>
        {error && (
          <span
            id={`inputError-${name}`}
            className={cn(
              "responsive-design inline-block font-nunito font-medium text-color2",
              "sm:text-[12px]",
              "md:text-[14px]",
              "2xl:text-[16px]"
            )}
          >
            {t(String(error?.message))}
          </span>
        )}
      </div>
    </div>
  );
};
