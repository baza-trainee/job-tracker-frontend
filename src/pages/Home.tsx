import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "../components/buttons/Button/Button";
import { LinkButton } from "../components/buttons/LinkButton/LinkButton";
import { IconButton } from "../components/buttons/IconButton/IconButton";
import { FormExample } from "../components/form/FormExample/FormExample";
import Modal from "../components/modal/Modal";
import { openModal } from "../store/slices/modalSlice";

function Home() {
  const { t } = useTranslation();
  const handleButtonClick = () => {
    console.log("click");
  };
  const dispatch = useDispatch();

  return (
    <section className="p-4">
      <div className="container">
        <h1 className="font-nunito text-8xl font-bold text-accent-primary">
          {t("welcome")}
        </h1>

        <Modal
          content={
            <div>
              <h1>Hello user! You can close me</h1>
            </div>
          }
          onCallFunction={
            () => { console.log("dont push me") }
          } />

        <Button variant="ghost" disabled size="big" onClick={handleButtonClick}>
          Click me
        </Button>
        <Button variant="ghost" size="small" onClick={() => dispatch(openModal())}>
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
