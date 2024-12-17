import { RefObject } from "react";

export type SortOption = {
  id: string;
  label: string;
  subOptions?: SortOption[];
};

export type DropdownMarkupProps = {
  ref: RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  handleOptionSelect: (optionId: string) => void;
  toggleDropdown: () => void;
  setFocusedOption: (optionId: string | null) => void;
  focusedOption: string | null;
  getButtonLabel: () => string;
  mainOptions: SortOption[];
  handleSubMenuToggle: (menuId: string) => void;
  openSubMenu: string | null;
};
