import { ICON } from "../../Icon/icons";

const NavList = () => {
  return [
    {
      icon: ICON.VACANCY,
      link: "/vacancies",
      title: "vacancies",
    },
    {
      icon: ICON.STATISTICS,
      link: "/statistics",
      title: "statistics",
    },
    {
      icon: ICON.ACCOUNT,
      link: "/profile",
      title: "account",
    },
    {
      icon: ICON.NOTE,
      link: "/notes",
      title: "notes",
    },
    {
      icon: ICON.ARCHIVE,
      link: "/archive",
      title: "archive",
    },
  ];
};

export default NavList;
