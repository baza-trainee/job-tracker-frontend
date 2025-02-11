import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface InputProps {
  onFocus?: () => void;
  name: string;
  placeholder: string;
  className?: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: React.HTMLInputTypeAttribute | "textarea";
  value?: string;
  id?: string;
  defaultValue?: string;
  disabled?: boolean;
  resetField(name: string): void;
  isButtonCopy?: boolean;
  isButtonRemoveInput?: boolean;
  handleClickButtonRemoveInput?: () => void;
  handleClickButtonCopyInput?: () => void;
  isCheckButtons?: boolean;
  isRequired?: boolean;
  promptMessage?: string;
  setValue?: UseFormSetValue<any>;
  rows?: number;
  autoFocus?: boolean;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
