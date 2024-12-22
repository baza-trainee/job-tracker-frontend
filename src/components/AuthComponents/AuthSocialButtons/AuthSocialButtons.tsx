import { Button } from "../../buttons/Button/Button";

import { GoogleLogin } from "../../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../../store/slices/authSlice/authOperation";

import Icon from "../../Icon/Icon";

export const AuthSocialButtons = () => {
  return (
    <div className="flex justify-center px-2 sm:gap-[22px] md:gap-[35px] xl:gap-[35px] 2xl:gap-8">
      <Button
        type="button"
        className="gap-3 text-[14px] md:gap-1 md:text-[16px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GoogleLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack">
          Google
        </span>
        <Icon id="Google" className="h-6 w-6" />
      </Button>

      <Button
        type="button"
        className="gap-3 text-[14px] md:gap-1 md:text-[16px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GithubLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack">
          GitHub
        </span>
        <Icon id="GitHub" className="h-6 w-6" />
      </Button>
    </div>
  );
};
