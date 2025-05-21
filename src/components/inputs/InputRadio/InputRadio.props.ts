import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface InputRadioProps {
  name: string;
  className?: string;
  label?: React.ReactNode | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: "default" | "signUp";
  id?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;

  onFocus?: () => void;
}
