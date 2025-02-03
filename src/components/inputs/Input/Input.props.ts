import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface InputProps {
  onFocus?: () => void;
  name: string;
  placeholder: string;
  className?: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  id?: string;
  resetField(name: string): void;
  isButtonCopy?: boolean;
  isButtonRemoveInput?: boolean;
  handleClickButtonRemoveInput?: () => void;
  handleClickButtonCopyInput?: () => void;
  isCheckButtons?: boolean;
  isRequired?: boolean;
  promptMessage?: string;
  setValue?: UseFormSetValue<any>;
}
