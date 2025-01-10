import {
  RejectReason,
  StatusName,
  Vacancy,
} from "../../../../types/vacancies.types";
import { cn } from "../../../../utils/utils";

const RejectDiagram = ({ vacancies }: { vacancies: Vacancy[] }) => {
  const rejects = vacancies.flatMap((vacancy) =>
    vacancy.statuses.filter((status) => status.name === "reject")
  );

  const totalRejects = rejects.length;
  const countRejectPercent = (reason: RejectReason) => {
    return (
      (rejects.filter((r) => r.rejectReason === reason).length / totalRejects) *
      100
    );
  };
  const test = countRejectPercent(RejectReason.ENGLISH);

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

  console.log("rejects", rejects);
  console.log("test", test);
  return (
    <div className="w-full">
      <ul className={cn("flex h-20 w-full overflow-hidden rounded-xl")}>
        {rejectList.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width: item.width }}
              className={cn(item.color, "")}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};
export default RejectDiagram;
