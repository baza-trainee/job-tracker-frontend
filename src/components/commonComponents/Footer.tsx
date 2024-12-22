import { useTranslation } from "react-i18next";
import classNames from "classnames";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="pb-6">
      <h2
        className={classNames(
          "text-center font-nunito font-medium leading-[135%] text-textBlack",
          "sm:text-[10px]",
          "md:text-[16px]"
        )}
      >
        <a href="#" className="">
          {t("footer.development")}
        </a>
        {t("footer.rights")}
      </h2>
    </footer>
  );
}

export default Footer;
