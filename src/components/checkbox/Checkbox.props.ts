import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export interface CheckboxProps {
  name: string;
  className?: string;
  label?: React.ReactNode | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: "default" | "signUp";
  id?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
  date?: string;
  onClick?: () => void;
  onFocus?: () => void;
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
  ref:any;
}
