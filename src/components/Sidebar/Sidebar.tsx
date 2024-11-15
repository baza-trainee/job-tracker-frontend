import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon.tsx";

function Sidebar() {
  return (
    <aside className="flex w-full max-w-64 flex-col bg-gray-900 text-white">
      <NavLink to="/" className="p-4 text-2xl font-bold">
        Home
      </NavLink>
      <nav className="mb-auto flex h-full flex-col gap-3 p-4">
        <NavLink
          to="/opportunities"
          className={({ isActive, isPending }) =>
            clsx(
              "rounded p-2",
              isPending && "bg-red-500",
              isActive && "bg-green-600",
              !isActive && "hover:bg-gray-700"
            )
          }
        >
          Opportunities
        </NavLink>
        <NavLink
          to="/matches"
          className={({ isActive, isPending }) =>
            clsx(
              "rounded p-2",
              isPending && "bg-red-500",
              isActive && "bg-green-600",
              !isActive && "hover:bg-gray-700"
            )
          }
        >
          Matches
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive, isPending }) =>
            clsx(
              "rounded p-2",
              isPending && "bg-red-500",
              isActive && "bg-green-600",
              !isActive && "hover:bg-gray-700"
            )
          }
        >
          Search
        </NavLink>
        <Icon id="day-mode" className="w-6 h-6 mx-3 my-1" dataActive={true}></Icon>
        <Icon id="night-mode" className="w-6 h-6 mx-3 my-1" dataActive={false}></Icon>
        <Icon id="log-out" className="w-10 h-10 mt-6"></Icon>
        <Icon id="arrow-iconamoon-send" className="w-8 h-8 mt-4" useStroke></Icon>
      </nav>
    </aside>
  );
}

export default Sidebar;
