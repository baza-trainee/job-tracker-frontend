import { Button } from "../../buttons/Button/Button";

import { GoogleLogin } from "../../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../../store/slices/authSlice/authOperation";

import Icon from "../../Icon/Icon";

export const AuthSocialButtons = () => {
  return (
    <div className="responsive-design flex justify-center px-2 sm:gap-[22px] md:gap-[22px] xl:gap-[35px] 2xl:gap-8">
      <Button
        type="button"
        className="responsive-design gap-3 text-[14px] md:gap-1 md:text-[20px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GoogleLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack">
          Google
        </span>
        <Icon id="Google" className="sm:h-6 sm:w-6 md:h-9 md:w-9" />
      </Button>

      <Button
        type="button"
        className="responsive-design gap-3 text-[14px] md:gap-1 md:text-[20px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GithubLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack">
          GitHub
        </span>
        <Icon id="GitHub" className="sm:h-6 sm:w-6 md:h-9 md:w-9" />
      </Button>
    </div>
  );
};
