import { useGetAllUserDataQuery } from "../store/querySlices/profileQuerySlice";

function Profile() {
  const {
    data,
    //  isSuccess, isFetching, error,
    isLoading,
    isError,
  } = useGetAllUserDataQuery();

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>Error... </h2>;
  }
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <h2>Profile</h2>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default Profile;
