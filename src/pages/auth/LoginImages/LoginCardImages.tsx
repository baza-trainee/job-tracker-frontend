// components
import InfoCard from "../InfoCard/InfoCard";

//consts
import { loginCardsImages } from "./LoginCardImages.const";

const LoginCardImages = () => {
  return (
    <div className="flex w-[700px] flex-col gap-[15px]">
      {loginCardsImages.map((elem, index) => (
        <InfoCard
          key={index}
          margin={elem.margin}
          color={elem.color}
          position={elem.position}
          border={elem.border}
          text={elem.text}
          image={elem.image}
          alt={elem.alt}
        />
      ))}
    </div>
  );
};

export default LoginCardImages;
