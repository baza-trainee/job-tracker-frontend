import { AuthHeaderProps } from "./AuthHeader.type";

export const AuthHeader = ({ isSignUpPage }: AuthHeaderProps) => {
  return (
    <div className="mb-[48px]">
      <h2 className="mb-3 font-nunito text-[32px] font-bold leading-[135%] text-text-primary">
        {isSignUpPage ? "Вітаємо!" : "Раді вас знову бачити! "}
      </h2>
      <p className="font-nunito text-[16px] font-medium leading-[135%] text-text-gray">
        {isSignUpPage
          ? "Зареєструйтесь для того, щоб оптимізувати свій пошук роботи"
          : "Увійдіть, щоб продовжити відслідковувати ваші відгуки"}
      </p>
    </div>
  );
};
