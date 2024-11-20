import { Button } from "../../buttons/Button/Button";

import GoogleLogo from "../../../assets/img/Google.svg";
import GitHubLogo from "../../../assets/img/GitHub.svg";

import { GoogleLogin } from "../../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../../store/slices/authSlice/authOperation";

export const AuthSocialButtons = () => {
  return (
    <div className="flex justify-between gap-[20px]">
      <Button
        type="button"
        className="gap-[12px]"
        variant="ghost"
        size="small"
        onClick={GoogleLogin}
      >
        <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
          Google
        </span>
        <img src={GoogleLogo} className="h-[36px] w-[36px]" alt="Google Logo" />
      </Button>

      <Button
        type="button"
        className="gap-[12px]"
        variant="ghost"
        size="small"
        onClick={GithubLogin}
      >
        <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
          GitHub
        </span>
        <img src={GitHubLogo} className="h-[36px] w-[36px]" alt="Google Logo" />
      </Button>
    </div>
  );
};
