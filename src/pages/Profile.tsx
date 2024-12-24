import { useGetAllUserDataQuery } from "../store/slices/profileQuerySlice/profileQuerySlice";
import {
  useGetAllVacancyQuery,
  useGetVacancyByIdQuery,
} from "../store/slices/vacanciesQuerySlice/vacanciesQuerySlice";

function Profile() {
  const {
    data,
    //  isSuccess, isFetching, error,
    isLoading,
    isError,
  } = useGetAllUserDataQuery();
  const { data: Vacancies } = useGetAllVacancyQuery();
  console.log("User all vacancies>> ", Vacancies);
  const { data: vacancyById } = useGetVacancyByIdQuery({
    vacancyId: "ffe13cf6-8cd6-4d46-88f4-1a518a184791",
  });
  console.log("vacancyById", vacancyById);

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
