import ProfileCard from "../components/Profile/ProfileCard";

import ButtonRemoveAccount from "@/components/Profile/ButtonRemoveAccount";

function Profile() {
  return (
    <section className="pb-6 pt-4 xl:pt-10">
      <div className="mx-auto grid max-w-[1920px] place-items-stretch gap-4 pl-5 pr-5 md:grid-cols-2 md:pl-6 md:pr-6 xl:grid-cols-[38.5%_28.5%_29%] xl:gap-6 3xl:pr-[118px]">
        <ProfileCard
          cardsType="addPersonalProperties"
          className="md:col-span-2 md:col-start-1 xl:col-span-1 xl:row-span-3"
        />
        <ProfileCard cardsType="addResumes" />
        <ProfileCard cardsType="addCoverLetters" />
        <ProfileCard
          cardsType="addProjects"
          className="md:col-span-2 md:col-start-1 xl:col-span-2 xl:col-start-2"
        />
        <div className="flex items-end justify-end pt-16 md:col-start-2 md:pt-0 xl:col-start-3">
          <ButtonRemoveAccount />
        </div>
      </div>
    </section>
  );
}

export default Profile;
