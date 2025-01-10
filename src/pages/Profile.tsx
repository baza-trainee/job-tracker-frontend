import ProfileCard from "../components/Profile/ProfileCard";

function Profile() {
  return (
    <div className="container flex flex-row flex-wrap gap-8 p-6">
      <ProfileCard cardsType="personalInfo" className="h-[30%] w-[30%]" />
      <ProfileCard cardsType="links" className="h-[30%] w-[50%]" />
      <ProfileCard cardsType="projects" className="h-[30%] w-[25%]" />
      <ProfileCard cardsType="resumes" className="h-[30%] w-[24%]" />
      <ProfileCard cardsType="coverLetters" className="h-[30%] w-[25%]" />
    </div>
  );
}

export default Profile;
