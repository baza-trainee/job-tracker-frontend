import classNames from "clsx";
import { CheckboxProps } from "./Checkbox.props";

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

  return (
    <div
      className={classNames({
        ["relative flex items-center px-[9.5px]"]: type === "signUp",
      })}
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
          className={classNames({
            ["peer relative h-6 w-6 shrink-0 appearance-none rounded-[4px] border-2 border-solid border-text-primary"]:
              type === "signUp",
          })}
        />
        {type === "signUp" && (
          <svg
            className="peer-checked:!fill- pointer-events-none absolute h-4 w-4 fill-none stroke-background-form peer-checked:!stroke-text-link"
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
        className={classNames({
          ["ml-3 font-nunito text-[16px] font-medium leading-[135%] text-gray-700 text-text-gray"]:
            type === "signUp",
        })}
      >
        {label}
      </label>
      {error && (
        <span
          id={`inputError-${name}`}
          className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-error"
        >
          {String(error?.message)}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
