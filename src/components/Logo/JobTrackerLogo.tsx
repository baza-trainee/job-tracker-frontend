import JobTrackerLogo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
      <Link to="/" >
        <img className="h-[26px] w-[47px] 2xl:h-[52px] 2xl:w-[94px] " src={JobTrackerLogo} alt="logo" />
      </Link>
  );
}

export default Logo;
