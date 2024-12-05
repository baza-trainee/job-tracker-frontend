// components
import InfoCard from "../InfoCard/InfoCard";

//consts
import { loginCardsImages } from "./LoginCardImages.const";

const LoginCardImages = () => {
  return (
    <div className="flex w-[683px] pt-[30px] flex-col gap-[13px]">
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
