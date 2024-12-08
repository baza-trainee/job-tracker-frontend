import { IconId } from "../Icon/icons";

export const loginCardsImages = [
  {
    margin: false,
    color: "blue",
    position: "left",
    border: `rounded-bl-[12px] rounded-br-[12px] rounded-tl-[0] rounded-tr-[12px] border-[6px] border-[solid]`,
    // TODO: loginCardsImages.text - src/utils/i18n/locales/uk/uk/json
    text: "infoCards.optimizeJobSearch",
    icon: "man-and-time" as IconId,
  },
  {
    margin: true,
    color: "blue",
    position: "rigth",
    border: `rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[0]`,
    text: "infoCards.pathToSuccess",
    icon: "girl-and-dashboard" as IconId,
  },
  {
    margin: false,
    color: "green",
    position: "left",
    border: `rounded-bl-[12px] rounded-br-[12px] rounded-tl-[0] rounded-tr-[12px]`,
    text: "infoCards.visualizeSuccess",
    icon: "dashboard" as IconId,
  },
  {
    margin: true,
    color: "green",
    position: "rigth",
    border: `rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[0]`,
    text: "infoCards.careerInYourHands",
    icon: "girl-with-phone" as IconId,
  },
];
