import { FC } from "react";
import { cn } from "../../utils/utils";
import Icons from "./sprite.svg";
import { IconId } from "./icons.ts";

export interface IconProps {
  id: IconId;
  className?: string;
  dataActive?: boolean;
  useStroke?: boolean;
}

export const Icon: FC<IconProps> = ({
  id,
  className,
  dataActive,
  useStroke,
}) => {
  return (
    <svg
      className={cn(
        useStroke
          ? [
              "stroke-gray-400 hover:stroke-gray-700 active:stroke-black",
              dataActive === true && "stroke-red-700",
              dataActive === false && "stroke-green-700",
            ]
          : [
              // "fill-gray-400 hover:fill-[#436B88] active:fill-black group-hover:fill-[#436B88]",

              dataActive === true && "fill-red-700",
              dataActive === false && "fill-green-700",
            ],
        className
      )}
    >
      <use href={`${Icons}#${id}`}></use>
    </svg>
  );
};

export default Icon;

// Example using Icon in components:

// 1 variant (в лапках для пошуку іконки комбінація клавіш cntrl+space):
// import Icon from "../Icon/Icon.tsx";
// <Icon id={"log-out"} />

// 2 variant:
// import Icon from "../Icon/Icon.tsx";
// import { ICON } from "../Icon/icons.ts";
// <Icon id={ICON.LOG-OUT} />

// Atributes:
// !! use atribute for active: dataActive="true" || dataActive="false"

// !! add props useStroke, if icon doesn't appear
