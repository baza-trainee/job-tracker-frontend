import cn from "clsx";
import { TextareaProps } from "./Textarea.props";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name,
      placeholder,
      label,
      className,
      register,
      errors,
      value,
      id,
      onFocus,
    },
    ref
  ) => {
    const error = errors[name];
    const { t } = useTranslation();
    const registerProps = register(name);

    return (
      <div className={cn("relative", [className])} id={id}>
        {label && (
          <label
            htmlFor={`input-${name}`}
            className="mb-[2px] block font-nunito text-[14px] font-medium leading-[135%] text-textBlack md:mb-2 md:text-[16px] xl:mb-3 2xl:mb-3 2xl:text-[20px]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <div className="relative flex w-full items-center overflow-hidden rounded-xl border border-textBlack">
            <textarea
              id={`textarea-${name}`}
              className={cn(
                "peer h-32 w-full resize-none px-2 py-3 font-nunito text-[12px] font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight focus:border-textOther focus:outline-none active:border-textOther md:text-[14px] 2xl:text-[16px]",
                "md:px-6 md:py-3",
                "2xl:px-6 2xl:py-2",
                "bg-transparent placeholder-shown:border-none",
                {
                  ["h-[230px]"]: name === "noteText",
                }
              )}
              placeholder={placeholder}
              {...(value && { value })}
              {...register(name)}
              aria-describedby={`textareaError-${name}`}
              onFocus={onFocus}
              ref={(el) => {
                registerProps.ref(el);
                if (ref && typeof ref === "function") {
                  ref(el);
                }
              }}
            />
          </div>
          {error ? (
            <span
              id={`inputError-${name}`}
              className={cn(
                "inline-block font-nunito font-medium text-color2",
                "text-[12px]",
                "md:text-[14px]",
                "2xl:text-[16px]",
                (name === "hours" || name === "minutes") &&
                  "absolute left-[-50%] top-[80%] z-10 w-[100px] rounded-md border border-color2 bg-whiteColor p-2 text-color2"
              )}
            >
              {t(String(error?.message))}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
