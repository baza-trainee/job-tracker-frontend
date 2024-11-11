import { useTranslation } from "react-i18next";
import { Button } from "../components/buttons/Button/Button";
import { LinkButton } from "../components/buttons/LinkButton/LinkButton";
import { IconButton } from "../components/buttons/IconButton/IconButton";
import { FormExample } from "../components/form/FormExample/FormExample";
import { useAppDispatch } from "../store/hook";
import { openModal } from "../store/slices/modalSlice/modalSlice";

function Home() {
  const { t } = useTranslation();
  const handleButtonClick = () => {
    console.log("click");
  };

  const dispatch = useAppDispatch();
  return (
    <section className="p-4">
      <div className="container">
        <h1 className="font-nunito text-8xl font-bold text-accent-primary">
          {t("welcome")}
        </h1>

        <Button variant="ghost" disabled size="big" onClick={handleButtonClick}>
          Click me
        </Button>
        <Button variant="ghost" size="small" onClick={() => dispatch(openModal({typeModal:"confirm", content: "Hello?", onCallFunction: () => {console.log("Ke")}}))}>
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
