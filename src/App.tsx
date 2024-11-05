import { IconButton } from "./components/buttons/IconButton/IconButton";
import { Button } from "./components/buttons/Button/Button";
import { LinkButton } from "./components/buttons/LinkButton/LinkButton";
import { FormExample } from "./components/form/FormExample/FormExample";

function App() {
  const handleButtonClick = () => {
    console.log("click");
  };

  return (
    <main className="flex h-dvh items-center justify-center">
      <div className="container">
        <h1 className="font-nunito text-8xl font-bold text-accent-primary">
          Job tracker
        </h1>
        <Button variant="white" onClick={handleButtonClick}>
          Click me
        </Button>
        <LinkButton variant="white" href="/">
          Link to
        </LinkButton>
        <IconButton label="Close button" variant="outline">
          x
        </IconButton>
        <FormExample />
      </div>
    </main>
  );
}

export default App;
