import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface LinkButtonProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: ReactNode;
  variant?: "accent" | "ghost";
  size?: "big" | "small";
  disabled?: boolean;
  href: string;
  centered?: boolean;
}
