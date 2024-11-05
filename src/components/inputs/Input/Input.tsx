import cn from "classnames";
import { InputProps } from "./Input.props";

export const Input = ({
  name,
  placeholder,
  className,
  type,
  register,
  errors,
  value,
  id,
}: InputProps) => {
  const error = errors[name];

  return (
    <label className={cn("relative", className)} id={id}>
      <input
        className={cn(
          "focus:shadow-input_active active:shadow-input_active w-full rounded-2xl border px-6 py-3 font-nunito text-base font-medium text-grey-80 transition placeholder:font-nunito placeholder-shown:border-grey-80 focus:border-accent-primary focus:outline-none active:border-accent-primary",
          {
            ["border-successful"]: !error,
            ["shadow-input_error border-error"]: error,
          },
        )}
        placeholder={placeholder}
        type={type}
        {...(value && { value })}
        {...register(name)}
      />

      {errors[name] && (
        <span className="mt-3 inline-block font-nunito text-base font-medium text-error">
          {String(errors[name]?.message)}
        </span>
      )}
    </label>
  );
};
