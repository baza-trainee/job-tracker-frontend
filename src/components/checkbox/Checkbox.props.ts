export interface CheckboxProps {
  type?: "default" | "signUp";
  defaultChecked?: boolean;
  id?: string | number;
  name: string; // нужна ли схема????????
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode | string;
  className?: string;
  checked?: boolean;
  // value: number | string;
  disabled?: boolean;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}
