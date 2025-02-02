import { Button } from "@/components/buttons/Button/Button";
import ProfileCard from "../components/Profile/ProfileCard";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-[40%_28%_28%] place-items-stretch gap-6 p-6">
      <ProfileCard cardsType="addPersonalProperties" className="row-span-3" />
      <ProfileCard cardsType="addResumes" className="" />
      <ProfileCard cardsType="addCoverLetters" className="" />
      <ProfileCard cardsType="addProjects" className="col-span-2 col-start-2" />
      <div className="col-start-3 flex items-end justify-end pt-11">
        <Button type="button" variant="accent">
          {t("buttonRemoveAccount")}
        </Button>
      </div>
    </div>
  );
}

export default Profile;
