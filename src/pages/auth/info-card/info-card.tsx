import classNames from "classnames";
import { InfoCardProps } from "./info-card.type";

const InfoCard = ({
  margin,
  color,
  position,
  border,
  text,
  image,
  alt,
}: InfoCardProps) => {
  return (
    <div
      className={classNames("relative flex max-w-[500px] flex-col", {
        "ml-auto": margin,
      })}
    >
      <span
        className={classNames(
          "absolute top-[-30px] flex h-[30px] w-[130px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px]",
          color === "blue" ? "bg-card-blue" : "bg-card-green",
          position === "left"
            ? "-translate-0 left-0"
            : "left-full -translate-x-full",
        )}
      ></span>
      <div
        className={classNames(
          "flex items-center justify-center gap-[15px] border-[6px] border-[solid] px-[9px] py-[14px]",
          color === "blue" ? "border-card-blue" : "border-card-green",
          `${border}`,
        )}
      >
        <p className="max-w-[335px] font-nunito text-[20px] font-bold leading-[135%] text-[#333]">
          {text}
        </p>
        <figure className="max-h-[120px] max-w-[120px]">
          <img
            src={image}
            className="max-h-full max-w-full object-cover"
            alt={alt}
          />
        </figure>
      </div>
    </div>
  );
};

export default InfoCard;
