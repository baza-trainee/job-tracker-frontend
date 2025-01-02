import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";

function Statistics() {
  return (
    <div className="container pb-8 pt-10">
      <div className="m-auto flex w-[1308px] flex-col">
        <StatisticsPanel />
        {/* <Calendar className={"size-16"}></Calendar> */}
      </div>
    </div>
  );
}

export default Statistics;
