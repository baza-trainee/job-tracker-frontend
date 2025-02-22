import { IconId } from "../../Icon/icons";

export interface SidebarActionItemProps {
  icon: IconId;
  link?: string;
  title: string;
  isOpen: boolean;
  useStroke?: boolean;
  className?: string;
  donateIcon?: boolean;
  action?: () => void;
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
  icon?: IconId;
}
