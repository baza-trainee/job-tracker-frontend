import { cn } from "@/utils/utils";
import FormProfileCard from "./FormProfileCard";
import { PropsProfileCard } from "./profileCardProps.props";

function ProfileCard({ cardsType, className }: PropsProfileCard) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex">
        <div className="rounded-[12px_12px_0_0] bg-color1 px-6 py-3">
          <span> {cardsType}</span>
        </div>
      </div>
      <FormProfileCard cardsType={cardsType} />
    </div>
  );
}

export default ProfileCard;
