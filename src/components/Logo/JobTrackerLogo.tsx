import JobTrackerLogo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import classNames from "classnames";

function Logo() {
  return (
    <Link to="/">
      <img
        className={classNames(
          "h-[26px] w-[47px]",
          "md:h-[52px] md:w-[94px]",
          "xl:h-[42px] xl:w-[84px]",
          "2lx:w-[94px] 2xl:h-[52px]"
        )}
        src={JobTrackerLogo}
        alt="logo"
      />
    </Link>
  );
}

export default Logo;
