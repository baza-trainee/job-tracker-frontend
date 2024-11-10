import cn from "classnames";
import { InputProps } from "./Input.props";

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

  const handleResetField = (name: string) => {
    resetField(name);
  };

  return (
    <div className={cn("relative", [className])} id={id}>
      {label && (
        <label
          htmlFor={`input-${name}`}
          // ALEX
          // className="text-text-primary mb-3 block font-nunito text-xl font-medium"
          className="mb-3 block font-nunito text-[20px] font-medium leading-[135%] text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className={"relative flex w-full items-center"}>
          <input
            id={`input-${name}`}
            className={cn(
              "peer h-11 w-full rounded-xl border px-6 py-2 font-nunito text-base font-medium text-text-primary transition placeholder:font-nunito placeholder:text-text-gray placeholder-shown:border-text-primary focus:border-accent focus:outline-none active:border-accent",
              {
                ["border-successful"]: !error,
                ["border-error placeholder-shown:border-error focus:border-error active:border-error"]:
                  error,
              },
            )}
            placeholder={placeholder}
            type={type}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`inputError-${name}`}
          />
          {errors && error ? (
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
            <div
              className={
                "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer peer-placeholder-shown:hidden"
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
          )}
        </div>
        {error && (
          <span
            id={`inputError-${name}`}
            className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-error"
          >
            {String(error?.message)}
          </span>
        )}
      </div>
    </div>
  );
};
