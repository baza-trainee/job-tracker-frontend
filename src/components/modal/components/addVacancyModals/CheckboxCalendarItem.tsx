import Checkbox from "../../../checkbox/Checkbox";
import { UseFormGetValues } from "react-hook-form";
import { CheckboxProps } from "../../../checkbox/Checkbox.props";

type CheckboxCalendarFunctionProps = {
  openCalendarCheckbox: (name: string) => void;
  getValues: UseFormGetValues<any>;
};

type CheckboxWithCalendarItemProps = CheckboxProps &
  CheckboxCalendarFunctionProps;

export const CheckboxCalendarItem = ({
  name,
  label,
  register,
  errors,
  getValues,
  openCalendarCheckbox,
}: CheckboxWithCalendarItemProps) => {
  const isChecked = getValues(name);
  const calendarValue = getValues(`${name}Calendar`);

  return (
    <div className="flex h-10 w-full items-center justify-between">
      <div>
        <Checkbox
          name={name}
          id={name}
          label={label}
          register={register}
          type="signUp"
          errors={errors}
          onClick={() => openCalendarCheckbox(name)}
        />
      </div>
      <span>{isChecked && calendarValue}</span>
    </div>
  );
};
