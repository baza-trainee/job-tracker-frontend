import Skeleton from "../Sceleton/Sceleton";

function SceletonProfile() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton width="100%" height="44px" className="rounded-xl" />
      <Skeleton width="100%" height="44px" className="rounded-xl" />
      <div className="flex w-full justify-center">
        <Skeleton width="50%" height="44px" className="rounded-xl" />
      </div>
    </div>
  );
}

export default SceletonProfile;
