import { FC } from "react";
import clsx from "clsx";
import Icons from "./sprite.svg";

interface IconProps {
    id: string;
    className?: string;
    dataActive?: boolean;
    useStroke?: boolean;
}

export const Icon: FC<IconProps> = ({ id, className, dataActive, useStroke }) => {
    return (
        <svg className={clsx(
            className,
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
                ]
        )}
        data-active={dataActive}
        >
            <use href={`${Icons}#${id}`}></use>
        </svg>
    )
};

export default Icon;

