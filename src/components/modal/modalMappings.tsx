export const contentMap = {
    success: <span className="text-4xl font-bold text-color8">Успіх!</span>,
    error: <span className="text-4xl font-bold text-color2">Упс!</span>,
    confirm: <span className="text-4xl font-bold text-color5">Підтвердіть дію!</span>,
    popup: "",
    custom: "",
    errorMailExist: <span className="text-4xl font-bold text-color2">Упс!</span>,
    recoveryPassword: <span className="text-4xl font-bold text-textBlack">Відновлення паролю</span>,
}
export const colorType = {
    success: {
        background: "bg-color8",
        border: "border-color8",
    },
    error: {
        background: "bg-color2",
        border: "border-color2",
    },
    confirm: {
        background: "bg-color8",
        border: "border-color8",
    },
    popup: {
        background: "bg-white",
        border: "border-white",
    },
    custom: {
        background: "bg-white",
        border: "border-white",
    },
    errorMailExist: {
        background: "bg-color2",
        border: "border-color2",
    },
    recoveryPassword: {
        background: "bg-button",
        border: "border-button",
    },
}
export const buttonMap = {
    success: "Продовжити",
    error: "Повторити спробу",
    confirm: "Ок",
    popup: "",
    custom : "",
    errorMailExist: ["Увійти", "Відновити"],
    recoveryPassword: "Відновити",
}
export const modalTextMap = {
    success: "Реєстрація пройшла успішно. Зараз ви можете налаштувати свій профіль.",
    error: "Перевірте введені дані та спробуйте ще раз.",
    confirm: undefined,
    popup: undefined,
    custom: undefined,
    errorMailExist: "Обліковий запис з такою поштою вже існує. Спробуйте увійти або відновити пароль.",
    recoveryPassword: "Обліковий запис з такою поштою вже існує. Спробуйте увійти або відновити пароль.",
}