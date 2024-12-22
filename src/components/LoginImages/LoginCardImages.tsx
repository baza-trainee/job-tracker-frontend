// components
import InfoCard from "../InfoCard/InfoCard";
import classNames from "classnames";

//consts
import { loginCardsImages } from "./LoginCardImages.const";

const LoginCardImages = () => {
  return (
    <div
      className={classNames(
        "hidden flex-col pt-[30px]",
        "xl:flex xl:w-[693px] xl:gap-[37px]",
        "2xl:w-[683px] 2xl:gap-[13px]",
        "3xl:w-[924px] 3xl:gap-[50px]"
      )}
    >
      {loginCardsImages.map((elem, index) => (
        <InfoCard
          key={index}
          margin={elem.margin}
          color={elem.color}
          position={elem.position}
          border={elem.border}
          text={elem.text}
          icon={elem.icon}
        />
      ))}
    </div>
  );
};

export default LoginCardImages;
