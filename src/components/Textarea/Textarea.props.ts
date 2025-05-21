import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface TextareaProps {
  name: string;
  placeholder: string;
  className?: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  value?: string;
  id?: string;
  resetField(name: string): void;
  onFocus?: () => void;
}
