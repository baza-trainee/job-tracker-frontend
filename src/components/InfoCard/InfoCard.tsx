import classNames from "classnames";
import { InfoCardProps } from "./InfoCard.type";
import { useTranslation } from "react-i18next";
import Icon from "../Icon/Icon";

const InfoCard = ({
  margin,
  color,
  position,
  border,
  text,
  icon,
}: InfoCardProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames("relative flex max-w-[503px] flex-col", {
        "ml-auto": margin,
      })}
    >
      <span
        className={classNames(
          "absolute top-[-30px] flex h-[30px] w-[130px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px]",
          color === "blue" ? "bg-color1" : "bg-color5",
          position === "left"
            ? "-translate-0 left-0"
            : "left-full -translate-x-full"
        )}
      ></span>
      <div
        className={classNames(
          "flex items-center justify-center gap-2 border-[6px] border-[solid] p-[14px]",
          color === "blue" ? "border-color1" : "border-color5",
          `${border}`
        )}
      >
        <p className="max-w-[335px] font-nunito text-[20px] font-bold leading-[135%] text-textBlack">
          {t(`${text}`)}
        </p>
        <Icon id={icon} className="h-[120px] w-[120px] p-1" />
      </div>
    </div>
  );
};

export default InfoCard;
