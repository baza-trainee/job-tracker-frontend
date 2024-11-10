import classNames from "classnames";
import { CheckboxProps } from "./Checkbox.props";

export const Checkbox = ({
  name,
  id,
  type = "default",
  label = "",
  disabled = false,
  required = false,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <div
      className={classNames({
        ["flex items-center px-[9.5px]"]: type === "signUp",
      })}
    >
      <div className="relative flex items-center justify-center">
        <input
          required={required}
          type="checkbox"
          id={`checkbox-${name}`}
          disabled={disabled}
          onChange={onChange}
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
    </div>
  );
};

export default Checkbox;
