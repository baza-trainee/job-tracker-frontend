import { RefObject } from "react";

export type SortOption = {
  id: string;
  label: string;
  shortLabel?: string;
  subOptions?: SortOption[];
};

export type Options = {
  mainOptions: SortOption[];
  buttonOption: SortOption;
};

export interface SortDropdownProps {
  options: Options;
  isInModal: boolean;
  action?: (option: string) => void;
  selectedType?: string;
}

export type DropdownMarkupProps = {
  ref: RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  handleOptionSelect: (optionId: string) => void;
  toggleDropdown: () => void;
  setFocusedOption: (optionId: string | null) => void;
  focusedOption: string | null;
  mainOptions: SortOption[];
  handleSubMenuToggle: (menuId: string) => void;
  openSubMenu: string | null;
  isInModal: boolean;
  buttonLabel: string;
  isTypeSelected: boolean;
};