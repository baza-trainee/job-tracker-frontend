import ProfileCard from "../components/Profile/ProfileCard";

import ButtonRemoveAccount from "@/components/Profile/ButtonRemoveAccount";

function Profile() {
  return (
    <div className="grid grid-cols-[40%_28%_28%] place-items-stretch gap-6 p-6">
      <ProfileCard cardsType="addPersonalProperties" className="row-span-3" />
      <ProfileCard cardsType="addResumes" className="" />
      <ProfileCard cardsType="addCoverLetters" className="" />
      <ProfileCard cardsType="addProjects" className="col-span-2 col-start-2" />
      <div className="col-start-3 flex items-end justify-end pt-11">
        <ButtonRemoveAccount />
      </div>
    </div>
  );
}

export default Profile;
