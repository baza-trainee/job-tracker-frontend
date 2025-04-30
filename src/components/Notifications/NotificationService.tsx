import { toast } from "react-toastify";
import { NotificationCustom } from "./NotificationCustom";
import Icon from "../Icon/Icon";

export const notifyError = (message: string, title?: string): void => {
  toast.error(<NotificationCustom title={title} message={message} />, {
    className:
      "w-fit border-t-transparent border-[1px] border-solid border-color2 rounded-tl-[0] rounded-br-[12px] rounded-tr-[0] rounded-bl-[12px] min-h-9 h-9",
    icon: <Icon id="cancel-in-round" className="h-6 w-6" />,
  });
};

export const notifySuccess = (message: string, title?: string): void => {
  toast.success(<NotificationCustom title={title} message={message} />, {
    className:
      "w-fit border-t-transparent border-[1px] border-solid border-color7 rounded-tl-[0] rounded-br-[12px] rounded-tr-[0] rounded-bl-[12px] min-h-9 h-9",
    icon: <Icon id="check-box-green" className="h-6 w-6" />,
  });
};

export const notifyInfo = (message: string, title?: string): void => {
  toast.info(<NotificationCustom title={title} message={message} />, {
    className:
      "w-fit border-t-transparent border-[1px] border-solid border-button rounded-tl-[0] rounded-br-[12px] rounded-tr-[0] rounded-bl-[12px] min-h-9 h-9",
    icon: <Icon id="GitHub" className="h-6 w-6" />,
  });
};
