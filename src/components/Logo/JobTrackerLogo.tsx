import JobTrackerLogo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <header className="flex p-10">
      <Link to="/">
        <img className="h-[52px] w-[94px]" src={JobTrackerLogo} alt="logo" />
      </Link>
    </header>
  );
}

export default Logo;
