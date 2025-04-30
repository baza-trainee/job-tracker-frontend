import { Button } from "../../../buttons/Button/Button";
import classNames from "classnames";

import InfoModalMap from "./InfoModalMap";
import { InfoModalProps } from "./InfoModal.type";

const InfoModal = ({ type, textColor }: InfoModalProps) => {
  const modalData = InfoModalMap()[type] || {
    title: "За замовчуванням",
    text: ["Модальне вікно за замовчуванням"],
    button: [],
  };

  return (
    <div className="mt-5 w-[449px] text-center text-textBlack sm:w-[264px] md:w-[349px] xl:w-[443px]">
      <h4
        className={classNames(
          "mb-3 font-nunito leading-[135%]",
          modalData.titleSize === "small"
            ? "text-[20px] font-bold"
            : classNames(
                "font-bold sm:text-[20px] md:text-[24px] xl:text-[32px]",
                textColor
              )
        )}
      >
        {modalData.title}
      </h4>
      <div className="mb-8 font-nunito font-medium leading-[135%] sm:text-[14px] md:text-[14px] xl:text-[20px]">
        {Object.entries(modalData.text).map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
      </div>
      <div
        className={classNames(
          "mx-auto flex flex-col justify-center sm:gap-3 md:flex-row md:gap-[22px]",
          modalData.button.length <= 1 ? "w-fit" : ""
        )}
      >
        {Object.entries(modalData.button).map(([key, value]) => (
          <Button
            key={key}
            type={value.type as "button" | "submit" | "reset"}
            className={value.className}
            variant={value.variant as "ghost" | "accent"}
            size={value.size as "big" | "small"}
            onClick={() => value.funcButton()}
            disabled={value.disabled || false}
          >
            {value.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InfoModal;
