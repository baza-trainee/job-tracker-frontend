import AuthorizationLayout from "../layouts/AuthorizationLayout";

export const ResetPassword = () => {
  return <AuthorizationLayout type="resetPassword" />;
};



//------------------------------------------------------------------------
// import AuthorizationLayout from "../layouts/AuthorizationLayout";
// import { useAppDispatch } from "../store/hook";
// import { isValidToken } from "../store/slices/authSlice/authOperation";
// import { useNavigate } from "react-router-dom";

// export const ResetPassword = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const validToken = async () => {
//     try {
//       const queryParams = new URLSearchParams(window.location.search);
//       const tokenFromUrl = queryParams.get("verify");
//       const token = tokenFromUrl || "";
//       await dispatch(isValidToken({ password: "password", token })).unwrap();
//     } catch (error) {
//       navigate("/log-in");
//       console.error("Submission failed:", error);
//     }
//   };
//   validToken();
//   return <AuthorizationLayout type="resetPassword" />;
// };

