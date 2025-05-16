import { useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../../store/hook.ts";
import { useTranslation } from "react-i18next";
import { RejectReason, Vacancy } from "../../../../types/vacancies.types";
import { cn } from "../../../../utils/utils";

import DiagramTitle from "./DiagramTitle";
import CustomLegend from "../../../charts/CustomLegend";
import CustomTooltip from "../../../charts/CustomTooltip";

import { selectTheme } from "../../../../store/slices/themeSlice/themeSelector.ts";

const RejectDiagram = ({ vacancies }: { vacancies: Vacancy[] }) => {
  const isDarkMode = useAppSelector(selectTheme);
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rejects = useMemo(() => {
    return vacancies.flatMap((vacancy) =>
      vacancy.statuses.filter((status) => status.name === "reject")
    );
  }, [vacancies]);

  if (rejects.length === 0) {
    return null;
  }

  const totalRejects = useMemo(() => rejects.length, [rejects]);

  const countRejectPercent = (reason: RejectReason) => {
    return Math.round(
      (rejects.filter((r) => r.rejectReason === reason).length / totalRejects) *
        100
    );
  };

  const rejectList = useMemo(() => {
    return [
      {
        title: RejectReason.OTHER,
        color: "color7",
        width: `${countRejectPercent(RejectReason.OTHER)}%`,
      },
      {
        title: RejectReason.NO_ANSWER,
        color: "color6",
        width: `${countRejectPercent(RejectReason.NO_ANSWER)}%`,
      },
      {
        title: RejectReason.STOPPED,
        color: "color4",
        width: `${countRejectPercent(RejectReason.STOPPED)}%`,
      },
      {
        title: RejectReason.SOFT_SKILLS,
        color: "color5",
        width: `${countRejectPercent(RejectReason.SOFT_SKILLS)}%`,
      },
      {
        title: RejectReason.TECH_SKILLS,
        color: "color3",
        width: `${countRejectPercent(RejectReason.TECH_SKILLS)}%`,
      },
      {
        title: RejectReason.ENGLISH,
        color: "color2",
        width: `${countRejectPercent(RejectReason.ENGLISH)}%`,
      },
      {
        title: RejectReason.EXPERIENCE,
        color: "color1",
        width: `${countRejectPercent(RejectReason.EXPERIENCE)}%`,
      },
    ];
  }, [rejects, countRejectPercent]);

  const chartData = useMemo(
    () => ({
      labels: rejectList
        .map((e) => e.title)
        .map((r) => t(`statisticsRejectDiagram.${r}`)),
      datasets: [
        {
          label: "",
          hoverBorderColor: "#436B88",
          backgroundColor: [
            // "#B1D690",
            // "#A6AEBF",
            // "#CDC1FF",
            // "#D0E8C5",
            // "#FEEE91",
            // "#FC8972",
            // "#C6E7FF",
            isDarkMode ? "rgba(177, 214, 144, 0.7)" : "color7",
            isDarkMode ? "rgba(166, 174, 191, 0.7)" : "color6",
            isDarkMode ? "rgba(205, 193, 255, 0.7)" : "color4",
            isDarkMode ? "rgba(208, 232, 197, 0.7)" : "color5",
            isDarkMode ? "rgba(254, 238, 145, 0.7)" : "color3",
            isDarkMode ? "rgba(252, 137, 114, 0.7)" : "color2",
            isDarkMode ? "rgba(177, 214, 144, 0.7)" : "color1",
          ],
          borderColor: [
            // "#B1D690",
            // "#A6AEBF",
            // "#CDC1FF",
            // "#D0E8C5",
            // "#FEEE91",
            // "#FC8972",
            // "#C6E7FF",
            isDarkMode ? "rgba(177, 214, 144, 0.7)" : "color7",
            isDarkMode ? "rgba(166, 174, 191, 0.7)" : "color6",
            isDarkMode ? "rgba(205, 193, 255, 0.7)" : "color4",
            isDarkMode ? "rgba(208, 232, 197, 0.7)" : "color5",
            isDarkMode ? "rgba(254, 238, 145, 0.7)" : "color3",
            isDarkMode ? "rgba(252, 137, 114, 0.7)" : "color2",
            isDarkMode ? "rgba(177, 214, 144, 0.7)" : "color1",
          ],
          borderWidth: 2,
        },
      ],
    }),
    [rejectList, t]
  );

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number | null;
    y: number | null;
    title: string;
    percent: string;
  }>({
    visible: false,
    x: null,
    y: null,
    title: "",
    percent: "",
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: { title: string; width: string }
  ) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = event.currentTarget.getBoundingClientRect();

    setTooltip({
      visible: true,
      x: elementRect.left + elementRect.width / 2 - containerRect.left,
      y: elementRect.top - containerRect.top,
      title: t(`statisticsRejectDiagram.${item.title}`),
      percent: item.width,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div
      ref={containerRef}
      className="relative mb-3 mt-4 flex w-full flex-col gap-2 text-textBlack md:mt-6 md:gap-4 xl:mt-8 xl:gap-6 3xl:mt-10"
    >
      <DiagramTitle title={t(`statisticsRejectDiagram.title`)} />
      <ul
        className={cn(
          "flex h-[29px] w-full overflow-hidden rounded-md md:h-[59px] md:rounded-xl xl:h-20"
        )}
      >
        {rejectList.map((item, index) => {
          if (item.width === "0%") {
            return null;
          }
          return (
            <li
              key={index}
              style={
                {
                  "--target-width": item.width,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                `bg-${item.color}`,
                `border-${item.color}`,
                `bar group relative border-2 transition-colors first:rounded-s-md last:rounded-e-md hover:border-iconHover hover:brightness-90 hover:saturate-200 md:first:rounded-s-xl md:last:rounded-e-xl`
              )}
            ></li>
          );
        })}
      </ul>
      {tooltip.x !== null && tooltip.y !== null && (
        <CustomTooltip
          title={tooltip.title}
          percent={tooltip.percent}
          position={{ x: tooltip.x, y: tooltip.y }}
          visible={tooltip.visible}
        />
      )}
      <CustomLegend
        data={chartData}
        className="mx-auto h-[180px] gap-3 md:h-[162px] md:w-[594px] md:gap-5 md:py-4 xl:h-[108px] xl:w-[937px] xl:flex-row xl:justify-center xl:gap-x-7 xl:gap-y-4 2xl:h-fit 2xl:w-full 2xl:justify-between 3xl:w-[1406px] 3xl:p-8"
      />
    </div>
  );
};
export default RejectDiagram;
