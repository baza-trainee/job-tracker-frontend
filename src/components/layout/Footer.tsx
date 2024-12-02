import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="pb-6">
      <h2 className="text-center font-nunito text-[16px] font-medium leading-[135%] text-textBlack">
        <a href="#" className="">
          {t("footer.development")}
        </a>
        {t("footer.rights")}
      </h2>
    </footer>
  );
}

export default Footer;
