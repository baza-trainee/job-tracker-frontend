import { useTranslation } from "react-i18next";

const PanelList = () => {
  const { t } = useTranslation();
  return [
    {
      cardName: t("navigation.vacancies"),
      cardQuantity: 160,
    },
    {
      cardName: t("navigation.vacancies"),
      cardQuantity: 143,
    },
    {
      cardName: t("navigation.vacancies"),
      cardQuantity: 84,
    },
    {
      cardName: t("navigation.vacancies"),
      cardQuantity: 97,
    },
  ];
};

export default PanelList;
