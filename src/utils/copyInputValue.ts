import {
  notifyError,
  notifySuccess,
} from "../components/Notifications/NotificationService";
import i18n from "./i18n/i18n";

export const copyInputValue = ({
  valueToCopy,
  text,
}: {
  valueToCopy: string;
  text?: string;
}) => {
  if (!valueToCopy) {
    return notifyError(i18n.t("notification.empty"));
  }
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => notifySuccess(`${text}`))
      .catch((error) => notifyError(`Error : ${error}`));
  } else {
    notifyError("error");
  }
};
