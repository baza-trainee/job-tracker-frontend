import { useTranslation } from "react-i18next";
import { IconId } from "../../Icon/icons";

const NavList = () => {
  const { t } = useTranslation();
  return [
    {
      icon: "vacancy" as IconId,
      link: "/vacancies",
      title: t("navigation.vacancies"),
    },
    {
      icon: "statistics" as IconId,
      link: "/statistics",
      title: t("navigation.statistics"),
    },
    {
      icon: "account" as IconId,
      link: "/profile",
      title: t("navigation.account"),
    },
    {
      icon: "note" as IconId,
      link: "/notes",
      title: t("navigation.notes"),
    },
  ];
};

export default NavList;
