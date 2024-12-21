import { useGetAllUserDataQuery } from "../store/slices/profileApiSlice/profileApiSlice";

function Profile() {
  const { data } = useGetAllUserDataQuery({});

  console.log(data);

  return (
    <div className="flex w-full items-center justify-center">
      <h2>Profile</h2>
    </div>
  );
}

export default Profile;
