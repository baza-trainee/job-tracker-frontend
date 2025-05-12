import React from "react";

type NotificationCustomProps = {
  title?: string;
  message: string;
};

export const NotificationCustom = React.memo(
  function CustomNotificationFunction({
    title,
    message,
  }: NotificationCustomProps) {
    return (
      <div className="bg-transparent text-[14px] font-normal leading-[135%] text-textBlack">
        {title ? <h4>{title}</h4> : null}
        <p>{message}</p>
      </div>
    );
  }
);
