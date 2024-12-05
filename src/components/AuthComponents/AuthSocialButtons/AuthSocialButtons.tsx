import { Button } from "../../buttons/Button/Button";

import { GoogleLogin } from "../../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../../store/slices/authSlice/authOperation";

import Icon from "../../Icon/Icon";

export const AuthSocialButtons = () => {
  return (
    <div className="flex justify-between gap-8 px-2">
      <Button
        type="button"
        className="gap-3"
        variant="ghost"
        size="small"
        onClick={GoogleLogin}
      >
        <span className="font-nunito text-[20px] font-medium leading-[135%] text-textBlack">
          Google
        </span>
        <Icon id="Google" className="h-6 w-6" />
      </Button>

      <Button
        type="button"
        className="gap-3"
        variant="ghost"
        size="small"
        onClick={GithubLogin}
      >
        <span className="font-nunito text-[20px] font-medium leading-[135%] text-textBlack">
          GitHub
        </span>
        <Icon id="GitHub" className="h-6 w-6" />
      </Button>
    </div>
  );
};
