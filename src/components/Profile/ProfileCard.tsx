import { cn } from "@/utils/utils";
import FormProfileCard from "./FormProfileCard";
import { PropsProfileCard } from "./profileCardProps.props";
import useProfileTexts from "./textProfile/useProfileText";

function ProfileCard({ cardsType, className }: PropsProfileCard) {
  const text = useProfileTexts({ cardsType });
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex">
        <div className="rounded-[12px_12px_0_0] bg-backgroundSecondary px-3 py-1.5 md:py-3 xl:px-4">
          <span> {text?.cardTitle}</span>
        </div>
      </div>
      <FormProfileCard cardsType={cardsType} />
    </div>
  );
}

export default ProfileCard;
