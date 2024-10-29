import { Link } from "react-router-dom";
import { LOCALS } from "../../utils/i18n/constns";
import i18next from "i18next";
import i18n from "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between bg-gray-900 p-2 text-2xl text-white">
      <Link to="/" className="rounded p-2 hover:bg-slate-500">
        Job Tracker
      </Link>
      <div>
        <button
          disabled={i18n.language === LOCALS.UA}
          onClick={() => i18n.changeLanguage(LOCALS.UA)}
          className="ml-3 rounded p-2 hover:bg-slate-500"
          type="button"
        >
          UK
        </button>
        <button
          disabled={i18n.language === LOCALS.EN}
          onClick={() => i18n.changeLanguage(LOCALS.EN)}
          className="rounded p-2 hover:bg-slate-500"
          type="button"
        >
          EN
        </button>

        <span>{i18next.language}</span>
      </div>
      <span className="w-full max-w-48">{t("user")}</span>
    </header>
  );
}

export default Header;
