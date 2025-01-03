import { FC } from "react";
import clsx from "clsx";

type SkeletonProps = {
  width: string;
  height: string;
  className?: string;
};

const Skeleton: FC<SkeletonProps> = ({ width, height, className }) => {
  return (
    <div
      className={clsx("animate-pulse rounded bg-gray-300", className)}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
