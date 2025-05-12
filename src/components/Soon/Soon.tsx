import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hook.ts";
import { openModal } from "../../store/slices/modalSlice/modalSlice.ts";
import Icon from "../Icon/Icon.tsx";
import CardSoon from "./CardSoon.tsx";
import Modal from "../modal/Modal.tsx";
import { Button } from "../buttons/Button/Button.tsx";
import { useGetAllEventsQuery } from "../../store/querySlices/eventsQuerySlice.ts";
import { Event as EventData } from "@/types/event.types";
import clsx from "clsx";

export const Soon = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: events, isLoading, error } = useGetAllEventsQuery();
  const [hasScroll, setHasScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const actualEvents = events?.filter((event) => {
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0); // Очищаємо час, щоб порівнювати тільки дати

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= dateToday;
  });

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        const clientHeight = scrollContainerRef.current.clientHeight;
        const isScrollable = scrollHeight > clientHeight;

        // console.log("scrollHeight:", scrollHeight);
        // console.log("clientHeight:", clientHeight);
        // console.log("hasScroll (before set):", isScrollable);

        setHasScroll(isScrollable);
      }
    };

    checkScroll();

    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [events]);

  const handleOpenModal = () => {
    dispatch(openModal({ isModalOpen: true, typeModal: "addEvent" }));
  };

  const handleOpenEditModal = (event: EventData) => {
    // console.log("Передаємо в openModal:", event);
    dispatch(
      openModal({ isModalOpen: true, typeModal: "editEvent", eventData: event })
    );
  };

  return (
    <div
      className={clsx(
        "box-border flex h-full flex-col justify-between text-textBlack",
        "pt-4 xl:px-2 2xl:px-4 2xl:pt-2",
        "w-full md:w-[344px] xl:w-[365px] 2xl:w-[382px] 3xl:w-[535px]"
      )}
    >
      <h3
        className={clsx(
          "w-full px-4 font-nunito font-medium leading-[135%] text-textBlack",
          "text-[16px] md:text-[20px] 2xl:text-[24px] 3xl:text-[28px]",
          "mb-3 xl:mb-2 2xl:mb-4 3xl:mb-6"
        )}
      >
        {t("soonSection.soon")}
      </h3>

      <div
        className={clsx(
          "flex h-full w-full flex-col",
          hasScroll ? "justify-between" : "justify-start"
        )}
      >
        <div
          ref={scrollContainerRef}
          className={clsx(
            // hasScroll ? "soon-scroll relative w-full overflow-y-scroll" : "",
            !hasScroll ? "soon-scroll__not-full" : "",
            "soon-scroll relative w-full overflow-y-scroll",
            "max-h-[202.8px] md:max-h-[346px] xl:max-h-[345px] 2xl:max-h-[353.2px] 3xl:max-h-[465px]",
            "pr-[10px] md:pr-[18px] 2xl:pr-5 3xl:pr-6"
          )}
        >
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
              {/* Локалізацію day потрібно зробити нижче */}
              {actualEvents?.map((event) => {
                const dayKey = new Date(event.date)
                  .toLocaleString("en-US", { weekday: "short" }) // Отримуємо англійську назву дня в якості ключа локалізації
                  .replace(".", ""); // у деяких локалях є зайва крапка "Thu." замість "Thu"

                return (
                  <li key={event.id}>
                    <CardSoon
                      day={t(`dayOfWeek.${dayKey}`)}
                      date={new Date(event.date).toLocaleString("uk-Ua", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      title={event.name}
                      time={event.time.slice(0, 5)}
                      onClick={() => handleOpenEditModal(event)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Button
          className={clsx(
            "flex items-center justify-start border-iconHover bg-backgroundTertiary",
            "w-full max-w-[calc(100%-10px)] md:max-w-[calc(100%-18px)] 2xl:max-w-[calc(100%-20px)] 3xl:max-w-[calc(100%-24px)]",
            "p-3 md:px-4 xl:px-4 3xl:px-6",
            "gap-2 3xl:gap-4",
            "text-[14px] font-normal leading-[135%] md:text-[20px] md:font-medium",
            "h-[48px] md:h-[50px]"
          )}
          onClick={handleOpenModal}
        >
          <Icon
            id="plus"
            className="mx-[13px] size-6 fill-textBlack md:mx-[14.5px] 3xl:ml-4 3xl:mr-[13px]"
          />
          {t("soonSection.addEvent")}
        </Button>
      </div>

      <Modal />
    </div>
  );
};

export default Soon;
