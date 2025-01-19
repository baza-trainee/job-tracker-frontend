import ProfileCard from "../components/Profile/ProfileCard";

function Profile() {
  return (
    <div className="container flex flex-row flex-wrap gap-8 p-6">
      <ProfileCard
        cardsType="addPersonalProperties"
        className="h-auto w-[30%]"
      />
      <ProfileCard cardsType="addProjects" className="h-auto w-[25%]" />
      <ProfileCard cardsType="addResumes" className="h-auto w-[24%]" />
      <ProfileCard cardsType="addCoverLetters" className="h-auto w-[25%]" />
    </div>
  );
}

export default Profile;
