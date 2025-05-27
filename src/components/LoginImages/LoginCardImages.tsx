// components
import InfoCard from "../InfoCard/InfoCard";
import classNames from "classnames";

//consts
import { loginCardsImages } from "./LoginCardImages.const";

const LoginCardImages = () => {
  return (
    <div>
      <div
        className={classNames(
          "flex h-0 w-0 scale-0 flex-col gap-[33px] overflow-hidden pt-[30px]",
          "xl:flex xl:h-auto xl:w-[693px] xl:scale-100 xl:gap-[33px]",
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
    </div>
  );
};

export default LoginCardImages;
