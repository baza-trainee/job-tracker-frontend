import { Button } from "../../../buttons/Button/Button";
import classNames from "classnames";

import InfoModalMap from "./InfoModalMap";
import { InfoModalProps } from "./InfoModal.type";

const InfoModal = ({ type, color }: InfoModalProps) => {
  return (
    <div className="w-[449px] text-center text-textBlack">
      <h4
        className={classNames(
          "mb-3 font-nunito leading-[135%]",
          InfoModalMap()[type].title.length < 10
            ? `text-[32px] font-bold text-${color}`
            : `text-[20px] font-medium`
        )}
      >
        {InfoModalMap()[type].title}
      </h4>
      <div className="mb-8 font-nunito text-[20px] font-medium leading-[135%]">
        {Object.entries(InfoModalMap()[type].text).map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
      </div>
      <div className="mx-auto flex w-fit justify-center gap-[30px]">
        {Object.entries(InfoModalMap()[type].button).map(([key, value]) => (
          <Button
            key={key}
            type={value.type as "button" | "submit" | "reset"}
            className={value.className}
            variant={value.variant as "ghost" | "accent"}
            size={value.size as "big" | "small"}
            onClick={() => value.funcButton()}
          >
            {value.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InfoModal;