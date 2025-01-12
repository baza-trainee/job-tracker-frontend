import { useTranslation } from "react-i18next";
import { ICON } from "../../Icon/icons";

const NavList = () => {
  const { t } = useTranslation();
  return [
    {
      icon: ICON.VACANCY,
      link: "/vacancies",
      title: t("navigation.vacancies"),
    },
    {
      icon: ICON.STATISTICS,
      link: "/statistics",
      title: t("navigation.statistics"),
    },
    {
      icon: ICON.ACCOUNT,
      link: "/profile",
      title: t("navigation.account"),
    },
    {
      icon: ICON.NOTE,
      link: "/notes",
      title: t("navigation.notes"),
    },
  ];
};

export default NavList;
