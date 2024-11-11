import { useTranslation } from "react-i18next";
import { Button } from "../components/buttons/Button/Button";
import { LinkButton } from "../components/buttons/LinkButton/LinkButton";
import { IconButton } from "../components/buttons/IconButton/IconButton";
import { FormExample } from "../components/form/FormExample";

import { Link } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const handleButtonClick = () => {
    console.log("click");
  };
  return (
    <section className="p-4">
      <div className="container">
        <h1 className="text-accent-primary font-nunito text-8xl font-bold">
          {t("welcome")}
        </h1>

        <LinkButton variant="ghost" size="big" href="/sign-up">
          Link to
        </LinkButton>

        <Button variant="ghost" disabled size="big" onClick={handleButtonClick}>
          Click me
        </Button>
        <Button variant="ghost" size="small" onClick={handleButtonClick}>
          Click me
        </Button>
        <LinkButton variant="ghost" size="big" href="/">
          Link to
        </LinkButton>
        <IconButton label="Close button" variant="outline">
          x
        </IconButton>
        <FormExample />
      </div>
    </section>
  );
}

export default Home;
