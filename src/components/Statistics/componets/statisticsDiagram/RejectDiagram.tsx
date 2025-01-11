import { useTranslation } from "react-i18next";
import { RejectReason, Vacancy } from "../../../../types/vacancies.types";
import { cn } from "../../../../utils/utils";
import DiagramTitle from "./DiagramTitle";
import CustomLegend from "../../../charts/CustomLegend";
import CustomTooltip from "../../../charts/CustomTooltip";

const RejectDiagram = ({ vacancies }: { vacancies: Vacancy[] }) => {
  const { t } = useTranslation();

  const rejects = vacancies.flatMap((vacancy) =>
    vacancy.statuses.filter((status) => status.name === "reject")
  );

  const totalRejects = rejects.length;
  const countRejectPercent = (reason: RejectReason) => {
    return Math.round(
      (rejects.filter((r) => r.rejectReason === reason).length / totalRejects) *
        100
    );
  };

  const rejectList = [
    {
      title: RejectReason.OTHER,
      color: "bg-color7",
      width: `${countRejectPercent(RejectReason.OTHER)}%`,
    },
    {
      title: RejectReason.NO_ANSWER,
      color: "bg-color6",
      width: `${countRejectPercent(RejectReason.NO_ANSWER)}%`,
    },
    {
      title: RejectReason.STOPPED,
      color: "bg-color4",
      width: `${countRejectPercent(RejectReason.STOPPED)}%`,
    },
    {
      title: RejectReason.SOFT_SKILLS,
      color: "bg-color5",
      width: `${countRejectPercent(RejectReason.SOFT_SKILLS)}%`,
    },
    {
      title: RejectReason.TECH_SKILLS,
      color: "bg-color3",
      width: `${countRejectPercent(RejectReason.TECH_SKILLS)}%`,
    },
    {
      title: RejectReason.ENGLISH,
      color: "bg-color2",
      width: `${countRejectPercent(RejectReason.ENGLISH)}%`,
    },
    {
      title: RejectReason.EXPERIENCE,
      color: "bg-color1",
      width: `${countRejectPercent(RejectReason.EXPERIENCE)}%`,
    },
  ];

  const chartData = {
    labels: rejectList
      .map((e) => e.title)
      .map((r) => t(`statisticsRejectDiagram.${r}`)),
    datasets: [
      {
        label: "",
        // data: rejectList.map((e) => e.width),
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
  };

  return (
    <div className="mb-3 flex w-full flex-col gap-6">
      <DiagramTitle title={t(`statisticsRejectDiagram.title`)} />
      <ul className={cn("flex h-20 w-full rounded-xl")}>
        {rejectList.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width: item.width }}
              className={cn(
                item.color,
                "group relative first:rounded-s-xl last:rounded-e-xl"
              )}
            >
              <CustomTooltip
                title={t(`statisticsRejectDiagram.${item.title}`)}
                percent={item.width}
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
              />
            </li>
          );
        })}
      </ul>
      <CustomLegend data={chartData} />
    </div>
  );
};
export default RejectDiagram;
