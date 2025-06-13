import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface TextareaProps {
  name: string;
  placeholder?: string;
  className?: string;
  classNameInputCustom?: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  value?: string;
  id?: string;
  rows?: number;
  isRequired?: boolean;
  resetField(name: string): void;
  onFocus?: () => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  watch?: UseFormWatch<any> | undefined;
}
