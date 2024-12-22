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
      className={classNames(
        "relative flex flex-col",
        "xl:max-w-[460px]",
        "2xl:max-w-[503px]",
        "3xl:max-w-[608px]",
        {
          "ml-auto": margin,
        }
      )}
    >
      <span
        className={classNames(
          "absolute top-[-29px] flex h-[30px] w-[130px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px]",
          "3xl:w-[134px]",
          color === "blue" ? "bg-color1" : "bg-color5",
          position === "left"
            ? "-translate-0 left-0"
            : "left-full -translate-x-full"
        )}
      ></span>
      <div
        className={classNames(
          "flex items-center justify-center border-[6px] border-[solid]",
          "xl:gap-1 xl:px-6 xl:py-[15px]",
          "2xl:gap-2 2xl:p-5",
          "3xl:gap-4 3xl:px-[69px] 3xl:py-5",
          color === "blue" ? "border-color1" : "border-color5",
          `${border}`
        )}
      >
        <p
          className={classNames(
            "max-w-[311px] font-nunito text-[20px] font-bold leading-[135%] text-textBlack",
            "2xl:max-w-[335px]"
          )}
        >
          {t(`${text}`)}
        </p>
        <Icon
          id={icon}
          className={classNames(
            "h-[100px] w-[100px] p-1",
            "2xl:h-[120px] 2xl:w-[120px]"
          )}
        />
      </div>
    </div>
  );
};

export default InfoCard;
