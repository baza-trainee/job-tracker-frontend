import classNames from "clsx";
import { CheckboxProps } from "./Checkbox.props";
import { useTranslation } from "react-i18next";

export const Checkbox = ({
  name,
  label,
  id,
  errors,
  type = "default",
  register,
  disabled = false,
  required = false,
  ...props
}: CheckboxProps) => {
  const error = errors[name];
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        type === "signUp" && "relative flex items-center px-[9.5px]"
      )}
      id={id}
    >
      <div className="relative flex items-center justify-center">
        <input
          required={required}
          type="checkbox"
          id={`checkbox-${name}`}
          disabled={disabled}
          {...register(name)}
          aria-describedby={`checkBoxError-${name}`}
          {...props}
          className={classNames(
            type === "signUp" &&
              "peer relative h-5 w-5 shrink-0 appearance-none rounded-[4px] border-[1px] border-solid border-textBlack",
            "md:border-2 md:h-6 md:w-6"
          )}
        />
        {type === "signUp" && (
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
        htmlFor={`checkbox-${name}`}
        className={classNames(
          type === "signUp" &&
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

export default Checkbox;
