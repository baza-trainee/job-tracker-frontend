import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { isLoggedIn, saveTokens } from "../store/slices/authSlice/authSlice";
import { useEffect } from "react";
import { openModal } from "../store/slices/modalSlice/modalSlice";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const urlParams = new URLSearchParams(window.location.search);

  const access_token = urlParams.get("access_token");
  const refresh_token = urlParams.get("refresh_token");

  useEffect(() => {
    if (access_token && refresh_token) {
      dispatch(saveTokens({ access_token, refresh_token }));
      dispatch(openModal({ typeModal: "logInSuccess" }));
      dispatch(isLoggedIn()); //+
    } else {
      dispatch(openModal({ typeModal: "logInError" })); //+
      navigate("/log-in"); //+
    }
  }, [dispatch, navigate, access_token, refresh_token]);

  return (
    <div className="nunito flex h-screen items-center justify-center text-5xl">
      <p className="text-textBlack">Loading ...</p>
    </div>
  );
};
