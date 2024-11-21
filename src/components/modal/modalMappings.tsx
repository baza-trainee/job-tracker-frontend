export const contentMap = {
    success: <span className="text-4xl font-bold text-modalWindowGreen">Успіх!</span>,
    error: <span className="text-4xl font-bold text-error">Упс!</span>,
    errorMailExist: <span className="text-4xl font-bold text-error">Упс!</span>,
    recoveryPassword: <span className="text-4xl font-bold text-blackTextColor">Відновлення паролю</span>,
    confirm: <span className="text-4xl font-bold text-successful">Підтвердіть дію!</span>,
    popup: "Привет чудики",
}
export const colorType = {
    success: {
        background: "bg-modalWindowGreen",
        border: "border-modalWindowGreen",
    },
    error: {
        background: "bg-modalWindowRed",
        border: "border-modalWindowRed",
    },
    errorMailExist: {
        background: "bg-modalWindowRed",
        border: "border-modalWindowRed",
    },
    recoveryPassword: {
        background: "bg-modalWindowBlue",
        border: "border-modalWindowBlue",
    },
    confirm: {
        background: "bg-modalWindowGreen",
        border: "border-modalWindowGreen",
    },
    popup: {
        background: "bg-white",
        border: "border-white",
    }
}
export const buttonMap = {
    success: "Продовжити",
    error: "Повторити спробу",
    errorMailExist: ["Увійти", "Відновити"],
    recoveryPassword: "Відновити",
    confirm: "Ок",
    popup: "",
}
export const modalTextMap = {
    success: "Реєстрація пройшла успішно. Зараз ви можете налаштувати свій профіль.",
    error: "Перевірте введені дані та спробуйте ще раз.",
    errorMailExist: "Обліковий запис з такою поштою вже існує. Спробуйте увійти або відновити пароль.",
    recoveryPassword: "Обліковий запис з такою поштою вже існує. Спробуйте увійти або відновити пароль.",
    confirm: undefined,
    popup: undefined,
}