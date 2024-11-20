import { Link } from "react-router-dom";

import { AuthFooterProps } from "./AuthFooterProps.type";

export const AuthFooter = ({ isSignUpPage, reset }: AuthFooterProps) => {
  return (
    <div className="mt-5 flex justify-center">
      <p className="font-nunito text-[16px] font-medium text-text-gray">
        {isSignUpPage ? "Вже зареєстровані?" : "Немає облікового запису?"}
        <Link
          className="ml-[6px] font-nunito text-[16px] font-medium leading-[135%] text-text-link"
          to={isSignUpPage ? "/log-in" : "/sign-up"}
          onClick={reset}
        >
          {isSignUpPage ? "Увійти" : "Зареєструватись"}
        </Link>
      </p>
    </div>
  );
};
