const DiagramTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-center font-nunito text-base leading-[135%] md:text-xl xl:text-[28px] 3xl:text-[36px] smOnly:pt-2">
      {title}
    </h2>
  );
};
export default DiagramTitle;
