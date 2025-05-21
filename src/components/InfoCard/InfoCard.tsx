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
        "relative flex max-w-[460px] flex-col",
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
          "absolute top-[-30px] flex h-[30px] w-[130px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px]",
          "3xl:w-[134px]",
          color === "blue"
            ? "bg-color1 dark:bg-color1-transparent"
            : "bg-color5 dark:bg-color5-transparent",
          position === "left"
            ? "-translate-0 left-0"
            : "left-full -translate-x-full"
        )}
      ></span>
      <div
        className={classNames(
          "flex items-center justify-center border-[6px] border-[solid] bg-backgroundMain px-6 py-[15px]",
          "xl:gap-1 xl:px-6 xl:py-[9px]",
          "2xl:gap-2 2xl:p-[14px]",
          "3xl:gap-4 3xl:px-[63px] 3xl:py-[14px]",
          color === "blue"
            ? "border-color1 dark:border-color1-transparent"
            : "border-color5 dark:border-color5-transparent",
          `${border}`
        )}
      >
        <p
          className={classNames(
            "max-w-[311px] font-nunito text-[4px] font-bold leading-[135%] text-textBlack",
            "xl:text-[20px]",
            "2xl:max-w-[335px]"
          )}
        >
          {t(`${text}`)}
        </p>
        <Icon
          id={icon}
          className={classNames(
            "h-[100px] w-[100px] fill-textBlack",
            "2xl:h-[120px] 2xl:w-[120px]"
          )}
        />
      </div>
    </div>
  );
};

export default InfoCard;
