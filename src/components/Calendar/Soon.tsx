import { useTranslation } from "react-i18next";
import Icon from "../Icon/Icon.tsx";

export const Soon = () => {
    const { t } = useTranslation();

    return (
        <div className="w-[348px] flex flex-col p-4 text-textBlack">
            <h3 className="w-full font-nunito px-6  text-textBlack text-2xl font-bold mb-[10px]">{t("soonSection.soon")}</h3>
            <ul className="w-full">
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <button className="w-full py-3 px-6 bg-backgroundTertiary flex items-center justify-start gap-4 rounded-xl hover:bg-backgroundSecondary" >
                <Icon id="plus" className="size-6 ml-4 mr-[13px]" />
                {t("soonSection.addEvent")}
            </button>
        </div>
    );
};

export default Soon;
