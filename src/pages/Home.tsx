import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
    </section>
  );
}

export default Home;
