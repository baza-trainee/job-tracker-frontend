import { useTranslation } from "react-i18next";
import classNames from "classnames";

function Footer() {
  const { i18n, t } = useTranslation();
  const currentYear: number = new Date().getFullYear();
  const link =
    i18n.language === "uk"
      ? "https://baza-trainee.tech/uk"
      : "https://baza-trainee.tech/en";
  return (
    <footer className="pb-4 md:pb-6 xl:pb-[11px] 2xl:pb-6 3xl:pb-4">
      <h2
        className={classNames(
          "text-center font-nunito font-medium leading-[135%] text-textBlack",
          "text-[10px]",
          "md:text-[16px]"
        )}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title=""
          className=""
        >
          {t("footer.development")}
          {currentYear}
        </a>
        {t("footer.rights")}
      </h2>
    </footer>
  );
}

export default Footer;
