import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon.tsx";
import { ICON } from "../Icon/icons.ts";

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
        <Icon id={ICON.DAY_MODE} className="w-6 h-6 mx-3 my-1" dataActive={true} />
        <Icon id={ICON.NIGHT_MODE} className="w-6 h-6 mx-3 my-1" dataActive={false} />
        <Icon id={ICON.LOG_OUT} className="w-8 h-8 mt-4" />
        <Icon id={ICON.FILTER} className="w-8 h-8 mt-4" useStroke />
      </nav>
    </aside>
  );
}

export default Sidebar;
