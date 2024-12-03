import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { saveTokens } from "../store/slices/authSlice/authSlice";
import { useEffect } from "react";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const access_token = urlParams.get("access_token");
  const refresh_token = urlParams.get("refresh_token");

  useEffect(() => {
    if (access_token && refresh_token) {
      dispatch(saveTokens({ access_token, refresh_token }));
    }
  }, [dispatch, navigate, access_token, refresh_token]);

  return (
    <div className="flex nunito text-5xl h-screen justify-center items-center">
        <p>Loading ...</p>
    </div>
  );
};
