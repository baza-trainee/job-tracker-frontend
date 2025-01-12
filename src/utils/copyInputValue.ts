import {
  notifyError,
  notifySuccess,
} from "../components/Notifications/NotificationService";

export const copyInputValue = (value: string) => {
  if (!value) {
    return notifyError("empty field");
  }
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(value)
      .then(() => notifySuccess("Text copied"))
      .catch((error) => notifyError(`Error : ${error}`));
  } else {
    notifyError("error");
  }
};
