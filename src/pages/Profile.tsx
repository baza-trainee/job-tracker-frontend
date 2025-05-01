import ProfileCard from "../components/Profile/ProfileCard";

import ButtonRemoveAccount from "@/components/Profile/ButtonRemoveAccount";

function Profile() {
  return (
    <section className="pb-6 pt-4 xl:pt-10">
      <div className="mx-auto grid max-w-[1920px] gap-y-4 px-5 md:px-6 xl:grid-cols-[36%_62%] xl:gap-x-6 2xl:grid-cols-[39%_59%] 3xl:grid-cols-[37.5%_59%]">
        <ProfileCard cardsType="addPersonalProperties" />
        <div className="flex flex-col gap-y-4 md:gap-x-6">
          <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-6">
            <ProfileCard cardsType="addResumes" className="w-full" />
            <ProfileCard cardsType="addCoverLetters" className="w-full" />
          </div>

          <ProfileCard cardsType="addProjects" />
        </div>

        <div className="flex justify-end pt-4 md:pt-0 xl:col-span-2">
          <ButtonRemoveAccount />
        </div>
      </div>
    </section>
  );
}

export default Profile;
