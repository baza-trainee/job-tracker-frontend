import { AuthHeaderProps } from "./AuthHeader.type";

export const AuthHeader = ({ isSignUpPage }: AuthHeaderProps) => {
  return (
    <div className="mb-10">
      <h2 className="mb-3 text-center font-nunito text-[32px] font-bold leading-[135%] text-textBlack">
        {isSignUpPage ? "Вітаємо!" : "Раді вас знову бачити! "}
      </h2>
      <p className="text-center font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight">
        {isSignUpPage
          ? "Зареєструйтесь щоб оптимізувати пошук роботи"
          : "Увійдіть, щоб продовжити відслідковувати ваші відгуки"}
      </p>
    </div>
  );
};
