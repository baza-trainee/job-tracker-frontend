import cn from "clsx";
import { TextareaProps } from "./Textarea.props";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Textarea = ({
  name,
  placeholder,
  label,
  className,
  register,
  resetField,
  errors,
  value,
  id,
}: TextareaProps) => {
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
          className="mb-3 block font-nunito text-[20px] font-medium leading-[135%] text-textBlack"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className={"relative flex w-full items-center"}>
          <textarea
            id={`textarea-${name}`}
            className={cn(
              "peer h-32 w-full resize-none rounded-xl border px-6 py-2 font-nunito text-base font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight placeholder-shown:border-textBlack focus:border-textOther focus:outline-none active:border-textOther",

              !error && "border-color5",
              error &&
                "border-color2 placeholder-shown:border-color2 focus:border-color2 active:border-color2"
            )}
            placeholder={placeholder}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`textareaError-${name}`}
          ></textarea>
          {error ? (
            <button
              onClick={() => handleResetField(name)}
              className={
                "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icons/cancel_24px">
                  <path
                    id="icon"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59Z"
                    fill="#FC8972"
                  />
                </g>
              </svg>
            </button>
          ) : (
            !isIcon && (
              <div
                className={
                  "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] peer-placeholder-shown:hidden"
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icons/check_box">
                    <path
                      id="icon"
                      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17.99 9L16.58 7.58L9.99 14.17L7.41 11.6L5.99 13.01L9.99 17L17.99 9Z"
                      fill="#D0E8C5"
                    />
                  </g>
                </svg>
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
