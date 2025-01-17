import classNames from "clsx";
import { InputRadioProps } from "./InputRadio.props";
import { useTranslation } from "react-i18next";

export const InputRadio = ({
  name,
  label,
  id,
  errors,
  register,
  disabled = false,
  required = false,
  className,
  ...props
}: InputRadioProps) => {
  const error = errors[name];
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        className === "addVacancy" && "relative flex items-center px-[9.5px]"
      )}
      id={id}
    >
      <div className="relative flex items-center justify-center">
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
              "peer relative h-5 w-5 shrink-0 appearance-none rounded-[4px] border-[1px] border-solid border-textBlack",
            "md:h-6 md:w-6 md:border-2"
          )}
        />
        {className === "addVacancy" && (
          <svg
            className="peer-checked:!fill- pointer-events-none absolute h-4 w-4 fill-none stroke-background-form peer-checked:!stroke-textOther"
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
            "ml-3 font-nunito font-medium leading-[135%] text-textBlackLight sm:text-[10px] md:text-[14px] 2xl:text-[16px]"
        )}
      >
        {label}
      </label>
      {error && (
        <span
          id={`inputError-${name}`}
          className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-color2"
        >
          {t(String(error?.message))}
        </span>
      )}
    </div>
  );
};

export default InputRadio;
