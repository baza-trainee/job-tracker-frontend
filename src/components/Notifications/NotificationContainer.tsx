import { ToastContainer, cssTransition } from "react-toastify";

const NotificationContainer = (): JSX.Element => {
  const notificationAnimation = cssTransition({
    enter: "notificationAnimation-in",
    exit: "notificationAnimation-out",
  });

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      transition={notificationAnimation}
      closeButton={false}
      className="right-6 top-0"
    />
  );
};

export default NotificationContainer;
