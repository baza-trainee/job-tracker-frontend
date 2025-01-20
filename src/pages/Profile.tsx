import { Button } from "@/components/buttons/Button/Button";
import ProfileCard from "../components/Profile/ProfileCard";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  return (
    <div className="container grid grid-cols-3 place-items-stretch gap-8 p-6">
      <ProfileCard
        cardsType="addPersonalProperties"
        className="row-span-3 h-auto"
      />
      <ProfileCard cardsType="addResumes" className="h-auto" />
      <ProfileCard cardsType="addCoverLetters" className="h-auto" />
      <ProfileCard
        cardsType="addProjects"
        className="col-span-2 col-start-2 h-auto"
      />
      <div className="col-start-3 flex justify-end pt-11">
        <Button type="button" variant="accent">
          {t("buttonRemoveAccount")}
        </Button>
      </div>
    </div>
  );
}

export default Profile;
