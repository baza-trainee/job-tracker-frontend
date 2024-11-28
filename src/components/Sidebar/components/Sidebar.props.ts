import { IconId } from "../../Icon/icons";

export interface DonateItemProps {
  icon: IconId;
  link?: string;
  title: string;
  isOpen: boolean;
  useStroke?: boolean;
}

export interface SidebarItemProps {
  icon: IconId;
  link: string;
  title: string;
  isOpen: boolean;
  useStroke?: boolean;
  funcLogOut?: () => void;
}

export interface ToggleProps {
  isOpen: boolean;
}

export interface SidebarBtnProps {
  handleOpenSidebar: () => void;
  isOpenSidebar?: boolean;
}
