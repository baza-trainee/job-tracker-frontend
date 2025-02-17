import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hook.ts";
import { openModal } from "../../store/slices/modalSlice/modalSlice.ts";
import Icon from "../Icon/Icon.tsx";
import CardSoon from "./CardSoon.tsx";
import Modal from "../modal/Modal.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import { useGetAllEventsQuery } from "../../store/querySlices/eventsQuerySlice.ts";
// import { useState } from "react";

export const Soon = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: events, isLoading, error } = useGetAllEventsQuery();
  // const [selectedEvent, setSelectedEvent] = useState(null);

  // const events = [
  //     { day: "Пн", date: "22.01", title: "Співбесіда в Google Співбесіда в Google", time: "12:30" },
  //     { day: "Ср", date: "23.01", title: "Співбесіда в Amazon Співбесіда ", time: "10:00" },
  //     { day: "Пт", date: "25.01", title: "Співбесіда в Microsoft", time: "14:45" },
  //     // { day: "Пн", date: "22.01", title: "Співбесіда в Google", time: "12:30" },
  //     // { day: "Ср", date: "23.01", title: "Співбесіда в Amazon", time: "10:00" },
  //     // { day: "Пт", date: "25.01", title: "Співбесіда в Microsoft", time: "14:45" },
  //     // { day: "Пт", date: "25.01", title: "Співбесіда в Microsoft", time: "14:45" },
  // ];

  const handleOpenModal = () => {
    dispatch(openModal({ isModalOpen: true, typeModal: "addEvent" }));
  };

  // const handleOpenEditModal = (event) => {
  const handleOpenEditModal = () => {
    // setSelectedEvent(event);
    dispatch(openModal({ isModalOpen: true, typeModal: "editEvent" }));
  };

  return (
    <div className="flex w-[532px] flex-col p-4 text-textBlack">
      <h3 className="mb-6 w-full px-6 font-nunito text-[28px] font-medium leading-[36px] text-textBlack">
        {t("soonSection.soon")}
      </h3>

      <div className="w-full">
        <div className="soon-scroll max-h-[456px] w-full overflow-y-scroll pr-2">
          {isLoading && (
            <div className="flex justify-start py-4 text-lg font-medium text-textBlack">
              {t("loading.loading")}...
            </div>
          )}

          {error && (
            <div className="flex justify-start py-4 text-lg font-medium text-textBlack">
              {t("loading.error")}...
            </div>
          )}

          {!isLoading && !error && (
            <ul className="w-full">
              {/* {events.map((event, index) => (
              <li key={index}>
                <CardSoon
                  day={event.day}
                  date={event.date}
                  title={event.title}
                  time={event.time}
                />
              </li>
            ))} */}
              {events?.map((event) => (
                <li key={event.id}>
                  <CardSoon
                    day={new Date(event.date).toLocaleString("uk-Ua", {
                      weekday: "short",
                    })}
                    date={new Date(event.date).toLocaleString("uk-Ua", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                    title={event.name}
                    time={event.time.slice(0, 5)}
                    // onClick={() => handleOpenEditModal(event)}
                    onClick={() => handleOpenEditModal()}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          className="flex w-[480px] items-center justify-start gap-2 border-iconHover bg-backgroundTertiary px-3 py-3 md:px-4 xl:gap-4 2xl:px-6"
          onClick={handleOpenModal}
        >
          <Icon id="plus" className="ml-4 mr-[13px] size-6" />
          {t("soonSection.addEvent")}
        </Button>
      </div>

      {/* <Modal selectedEvent={selectedEvent} /> */}
      <Modal />
    </div>
  );
};

export default Soon;
