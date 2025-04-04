import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ForwardedRef } from "react";

export interface InputProps {
  ref?: ForwardedRef<HTMLInputElement>;
  onFocus?: () => void;
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: React.HTMLInputTypeAttribute | "textarea" | "vacancy";
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
  classNameInputCustom?: string;
  autoFocus?: boolean;
  maxLength?: number;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
