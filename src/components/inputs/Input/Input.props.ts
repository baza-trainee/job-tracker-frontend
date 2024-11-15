import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface InputProps {
  name: any;
  placeholder: string;
  className?: string;
  label?: string;
  register: UseFormRegister<any>
  errors: FieldErrors;
  type?: string;
  value?: string;
  id?: string;
  resetField(name: string): void;
}
