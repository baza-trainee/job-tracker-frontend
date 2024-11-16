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

// !! use for active dataActive="true" || dataActive="false"

// !! add props useStroke, if icon doesn't appear

export const Icon: FC<IconProps> = ({ id, className, dataActive, useStroke }) => {
    return (
        <svg className={cn(
            useStroke
                ? [
                    "stroke-gray-400 hover:stroke-gray-700 active:stroke-black",
                    dataActive === true && "stroke-red-700",
                    dataActive === false && "stroke-green-700",
                ] 
                : 
                [
                    "fill-gray-400 hover:fill-gray-700 active:fill-black",
                    dataActive === true && "fill-red-700",
                    dataActive === false && "fill-green-700",
                ],                
            className,
        )}
        >
            <use href={`${Icons}#${id}`}></use>
        </svg>
    )
};

export default Icon;
