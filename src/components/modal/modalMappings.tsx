import { Trans } from 'react-i18next';

export const contentMap = {
    success: <span className="text-4xl font-bold text-color8"><Trans i18nKey="modalMappingContentMap.success" /></span>,
    error: <span className="text-4xl font-bold text-color2"><Trans i18nKey="modalMappingContentMap.error" /></span>,
    confirm: <span className="text-4xl font-bold text-color5"><Trans i18nKey="modalMappingContentMap.confirm" /></span>,
    popup: "",
    custom: "",
    errorMailExist: <span className="text-4xl font-bold text-color2"><Trans i18nKey="modalMappingContentMap.errorMailExist" /></span>,
    recoveryPassword: <span className="text-4xl font-bold text-textBlack"><Trans i18nKey="modalMappingContentMap.recoveryPassword" /></span>,
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
    success: <Trans i18nKey="modalMappingButtonMap.success" />,
    error: <Trans i18nKey="modalMappingButtonMap.error" />,
    confirm: <Trans i18nKey="modalMappingButtonMap.confirm" />,
    popup: "",
    custom : "",
    errorMailExist: <Trans i18nKey="modalMappingButtonMap.errorMailExist" />,
    recoveryPassword: <Trans i18nKey="modalMappingButtonMap.recoveryPassword" />,
}
export const modalTextMap = {
    success: <Trans i18nKey="modalMappingModalTextMap.success" />,
    error: <Trans i18nKey="modalMappingModalTextMap.error" />,
    confirm: undefined,
    popup: undefined,
    custom: undefined,
    errorMailExist: <Trans i18nKey="modalMappingModalTextMap.errorMailExist" />,
    recoveryPassword: <Trans i18nKey="modalMappingModalTextMap.recoveryPassword" />,
}