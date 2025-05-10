import { useRef, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/utils";
import { InputProps } from "./Input.props";
import Icon from "@/components/Icon/Icon";

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      name,
      placeholder,
      label,
      className,
      type = "text",
      register,
      resetField,
      errors,
      value,
      onBlur,
      defaultValue,
      id,
      disabled = false,
      autoFocus = false,
      onFocus,
      isButtonCopy = false,
      isButtonRemoveInput = false,
      handleClickButtonRemoveInput,
      handleClickButtonCopyInput,
      isCheckButtons = true,
      isRequired,
      promptMessage = "",
      setValue,
      rows,
      classNameInputCustom,
      onKeyDown,
      onClick,
      onChange,
      onInput,
      autoComplete,
      maxLength,
      // watch,
    },
    forwardedRef
  ) => {
    const error = errors[name];
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isIcon, setIsIcon] = useState<boolean>(false);
    const { t } = useTranslation();

    // const watchedValue = watch ? watch(name) : "";
    // const watchedValue = watch?.(name) ?? "";

    const isIconVisible: boolean = Boolean(inputRef.current?.value);
    // const isIconVisible = Boolean(watchedValue);

    const handleResetField = (name: string) => {
      resetField(name);
    };

    // const { onBlur: hookFormOnBlur, ref: refInput } = register(name);
    const registerProps = register(name);

    return (
      <div
        className={cn("relative", className)}
        id={id}
        onFocus={() => setIsIcon(true)}
        onBlur={() => {
          setIsIcon(false);
        }}
      >
        {label && (
          <label
            htmlFor={`input-${name}`}
            className={cn(
              "mb-3 inline-block font-nunito font-medium leading-[135%] text-textBlack",
              "mb-[2px] text-[14px]",
              "md:mb-2 md:text-[16px]",
              "xl:mb-2 xl:text-[16px]",
              "2xl:mb-3 2xl:text-[20px]",
              { "2xl:mb-1 2xl:text-[16px]": type === "vacancy" }
            )}
          >
            {label} {isRequired && <span className={cn("text-color2")}>*</span>}
          </label>
        )}
        <div className="relative">
          <div className={cn("relative flex w-full items-center")}>
            {type === "textarea" ? (
              <textarea
                {...registerProps}
                id={`input-${name}`}
                className={cn(
                  "w-full rounded-xl border p-3 text-base",
                  "peer w-full font-nunito text-base font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight",
                  "rounded-xl border border-color7 focus:border-textOther focus:outline-none active:border-textOther",
                  "placeholder-shown: border-textBlack",
                  "sm:px-4 sm:py-2 sm:text-[12px]",
                  "md:px-6 md:py-3 md:text-[14px]",
                  "xl:text-[14px]",
                  "2xl:text-[16px]",
                  {
                    // "border-color7": !error,
                    "border-color2 placeholder-shown:border-color2": error, // Serhii 01-05
                  },
                  classNameInputCustom
                )}
                placeholder={placeholder}
                rows={rows || 4}
                // {...register(name)}
                {...(value && { value })}
                onBlur={(event) => {
                  setValue?.(name, event.target.value.trim(), {
                    shouldValidate: true,
                  });
                  // hookFormOnBlur(event);
                  registerProps.onBlur(event);
                  onBlur?.(event);
                }}
                onChange={(e) => (registerProps.onChange(e), onChange?.(e))}
              />
            ) : (
              <input
                {...registerProps}
                disabled={disabled}
                {...(autoFocus && { autoFocus })}
                onFocus={onFocus}
                id={`input-${name}`}
                className={cn(
                  "peer w-full font-nunito text-base font-medium text-textBlack transition placeholder:font-nunito placeholder:text-textBlackLight",
                  "rounded-lg border border-textBlack focus:border-textOther focus:outline-none active:border-textOther",
                  // "placeholder-shown:border-textBlack",
                  "h-[34px] px-4 py-2 pr-8 text-[12px]",
                  "md:h-11 md:px-6 md:py-3 md:pr-8 md:text-[14px]",
                  "xl:text-[14px]",
                  "2xl:text-[16px]",
                  {
                    // "border-color7": !error,
                    "border-color7": !error && isIconVisible,
                    "border-color2": error,
                    "pr-16 md:pr-16": isButtonRemoveInput,
                  },
                  classNameInputCustom
                )}
                placeholder={placeholder}
                type={type}
                {...(value && { value })}
                {...(defaultValue && { defaultValue })}
                // {...register(name)}
                aria-describedby={`inputError-${name}`}
                title={promptMessage}
                onBlur={(event) => {
                  setValue?.(name, event.target.value.trim(), {
                    shouldValidate: true,
                  });
                  // hookFormOnBlur(event);
                  registerProps.onBlur(event);
                  onBlur?.(event);
                }}
                ref={(el) => {
                  // refInput(el);
                  registerProps.ref(el);
                  if (el) inputRef.current = el;
                  if (forwardedRef && typeof forwardedRef === "function") {
                    forwardedRef(el);
                  } else if (forwardedRef) {
                    (forwardedRef as React.MutableRefObject<any>).current = el;
                  }
                }}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onInput={onInput}
                onChange={(e) => {
                  registerProps.onChange(e);
                  onChange?.(e);
                }}
                autoComplete={autoComplete}
                maxLength={maxLength}
              />
            )}

            <div className="absolute right-2 top-[50%] mt-auto flex h-6 translate-y-[-50%] gap-2 mix-blend-multiply">
              {isButtonCopy && (
                <button
                  type="button"
                  aria-label="copy text"
                  onClick={handleClickButtonCopyInput}
                >
                  <Icon
                    id="copy"
                    className="h-6 w-6 cursor-pointer fill-black transition-all active:fill-color5 md:hover:fill-color5"
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
                    className="h-6 w-6 cursor-pointer fill-black transition-all hover:fill-color2"
                  />
                </button>
              )}
              {/* {isCheckButtons && isIconVisible ? (
                error ? (
                  <button onClick={() => handleResetField(name)}>
                    <Icon
                      id="cancel-in-round"
                      className="h-6 w-6 cursor-pointer fill-color2"
                    />
                  </button>
                ) : (
                  !isIcon && (
                    <div>
                      <Icon
                        id="check-box"
                        className="h-6 w-6 cursor-pointer fill-color7"
                      />
                    </div>
                  )
                )
              ) : null} */}
              {/* Оля */}
              {isCheckButtons ? (
                error ? (
                  <button onClick={() => handleResetField(name)}>
                    <Icon
                      id="cancel-in-round"
                      className="h-6 w-6 cursor-pointer fill-color2"
                    />
                  </button>
                ) : (
                  isIconVisible &&
                  !isIcon && (
                    <div>
                      <Icon
                        id="check-box"
                        className="h-6 w-6 cursor-text fill-color7"
                      />
                    </div>
                  )
                )
              ) : null}
            </div>
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
                  "bg-whiteColor absolute top-[130%] z-10 w-[66vw] rounded-md pb-2 pl-4 pt-1 text-start text-xs text-color2 md:top-[120%] md:w-[250px] md:text-sm xl:top-[110%] xl:w-[280px] 2xl:text-base",
                name === "hours" && "left-[-90%] md:left-[-80%]",
                name === "minutes" && "left-[-286%] md:left-[-80%]"
              )} //md:text-center text-end
            >
              {t(String(error?.message))}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
