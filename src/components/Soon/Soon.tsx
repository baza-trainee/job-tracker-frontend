import { useTranslation } from "react-i18next";
import Icon from "../Icon/Icon.tsx";
// import ListSoon from "./ListSoon.tsx";
import CardSoon from "./CardSoon.tsx";

export const Soon = () => {
    const { t } = useTranslation();

    const events = [
        { day: "Пн", date: "22.01", title: "Співбесіда в Google", time: "12:30" },
        { day: "Ср", date: "23.01", title: "Співбесіда в Amazon", time: "10:00" },
        { day: "Пт", date: "25.01", title: "Співбесіда в Microsoft", time: "14:45" },
    ]

    return (
        <div className="w-[461px] flex flex-col p-4 text-textBlack">
            <h3 className="w-full font-nunito px-6 text-textBlack text-[24px] font-medium mb-6">{t("soonSection.soon")}</h3>
            <ul className="w-full">
                {events.map((event, index) => (
                    <li key={index}>
                        <CardSoon day={event.day} date={event.date} title={event.title} time={event.time}/>
                    </li>
                ))}
            </ul>
            <button className="w-full py-3 px-6 text-xl bg-backgroundTertiary flex items-center justify-start gap-4 rounded-xl hover:bg-backgroundSecondary" >
                <Icon id="plus" className="size-6 ml-4 mr-[13px]" />
                {t("soonSection.addEvent")}
            </button>
        </div>
    );
};

export default Soon;
