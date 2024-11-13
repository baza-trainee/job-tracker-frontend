import clsx from "clsx";
import { NavLink } from "react-router-dom";

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
      </nav>
    </aside>
  );
}

export default Sidebar;
