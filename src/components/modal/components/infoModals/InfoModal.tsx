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
    <div className="w-[449px] text-center text-textBlack sm:w-[264px] md:w-[349px] xl:w-[443px]">
      <h4
        className={classNames(
          "mb-3 font-nunito leading-[135%]",
          modalData.title.length < 10
            ? classNames(
                "font-bold sm:text-[20px] md:text-[24px] xl:text-[32px]",
                textColor
              )
            : "text-[20px] font-medium"
        )}
      >
        {modalData.title}
      </h4>
      <div className="mb-8 font-nunito font-medium leading-[135%] sm:text-[14px] md:text-[14px] xl:text-[20px]">
        {Object.entries(modalData.text).map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
      </div>
      <div className="mx-auto flex w-fit justify-center sm:gap-3 md:gap-[30px]">
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
