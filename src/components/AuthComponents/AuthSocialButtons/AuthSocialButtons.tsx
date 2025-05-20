import { Button } from "../../buttons/Button/Button";

import { GoogleLogin } from "../../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../../store/slices/authSlice/authOperation";

import Icon from "../../Icon/Icon";

export const AuthSocialButtons = () => {
  return (
    <div className="flex justify-center gap-[22px] px-2 xl:gap-[35px] 2xl:gap-8">
      <Button
        type="button"
        className="group gap-3 text-[14px] md:gap-1 md:text-[20px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GoogleLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack dark:group-hover:text-blackColor">
          Google
        </span>
        <Icon id="Google" className="h-6 w-6 md:h-9 md:w-9" />
      </Button>

      <Button
        type="button"
        className="group gap-3 text-[14px] md:gap-1 md:text-[20px] 2xl:text-[20px]"
        variant="ghost"
        size="small"
        onClick={GithubLogin}
      >
        <span className="font-nunito font-medium leading-[135%] text-textBlack dark:group-hover:text-blackColor">
          GitHub
        </span>
        <Icon
          id="GitHub"
          className="h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor md:h-9 md:w-9"
        />
      </Button>
    </div>
  );
};
