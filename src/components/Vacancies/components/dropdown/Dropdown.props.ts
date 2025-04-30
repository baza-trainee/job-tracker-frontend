import { RootState } from "@/store/store";
import { Selector } from "@reduxjs/toolkit";

import { RefObject } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

export type SortOption = {
  id: string;
  label: string;
  name?: string;
  shortLabel?: string;
  subOptions?: SortOption[];
};

export type Options = {
  mainOptions: SortOption[];
  buttonOption: SortOption;
};

export interface SortDropdownProps<T = any> {
  options: Options;
  isInModal: boolean;
  setValue: (option: string, name?: any) => void;

  name: string;
  register?: UseFormRegister<any>;
  getValues?: UseFormGetValues<any>;
  selector?: Selector<RootState, T>;
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
  id?: string;
  selectedSortType: string;
};
