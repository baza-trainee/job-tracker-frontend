import { PropsProfileCard } from "./profileCardProps.props";

export type PropsModalAddProperties = Pick<PropsProfileCard, "cardsType">;

export type DataItem = {
  name: string;
  placeholderName: string;
  technology?: string;
  placeholderTechnology?: string;
  link: string;
  placeholderLink: string;
};

export type DataUpdateItem = { id?: string } & DataItem;
