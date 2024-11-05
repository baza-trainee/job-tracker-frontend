export interface IconButtonProps {
  variant?: "filled" | "outline" | "default";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
}
