import { Button } from "./components/buttons/Button/Button";
import { LinkButton } from "./components/buttons/LinkButton/LinkButton";

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
      </div>
    </main>
  );
}

export default App;
