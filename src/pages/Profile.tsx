import ProfileCard from "../components/Profile/ProfileCard";

function Profile() {
  return (
    <div className="container flex flex-row flex-wrap gap-8 p-6">
      <ProfileCard cardsType="personalInfo" className="h-auto w-[30%]" />
      <ProfileCard cardsType="projects" className="h-auto w-[25%]" />
      <ProfileCard cardsType="resumes" className="h-auto w-[24%]" />
      <ProfileCard cardsType="coverLetters" className="h-auto w-[25%]" />
    </div>
  );
}

export default Profile;
