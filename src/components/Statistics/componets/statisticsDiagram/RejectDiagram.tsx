import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RejectReason, Vacancy } from "../../../../types/vacancies.types";
import { cn } from "../../../../utils/utils";

import DiagramTitle from "./DiagramTitle";
import CustomLegend from "../../../charts/CustomLegend";
import CustomTooltip from "../../../charts/CustomTooltip";

const RejectDiagram = ({ vacancies }: { vacancies: Vacancy[] }) => {
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
            "#B1D690",
            "#A6AEBF",
            "#CDC1FF",
            "#D0E8C5",
            "#FEEE91",
            "#FC8972",
            "#C6E7FF",
          ],
          borderColor: [
            "#B1D690",
            "#A6AEBF",
            "#CDC1FF",
            "#D0E8C5",
            "#FEEE91",
            "#FC8972",
            "#C6E7FF",
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
      className="relative mb-3 flex w-full flex-col gap-6"
    >
      <DiagramTitle title={t(`statisticsRejectDiagram.title`)} />
      <ul className={cn("flex h-20 w-full overflow-hidden rounded-xl")}>
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
                `bar group relative border-2 transition-colors first:rounded-s-xl last:rounded-e-xl hover:border-iconHover hover:brightness-90 hover:saturate-200`
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
      <CustomLegend data={chartData} />
    </div>
  );
};
export default RejectDiagram;