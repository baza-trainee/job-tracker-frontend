import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon.tsx";
import { ICON } from "../Icon/icons.ts";
import SidebarItem from "./SidebarItem.tsx";

function Sidebar() {
  return (
    <aside className="flex w-full max-w-[276px] flex-col rounded-r-[20px] bg-background-sidebar px-6 pb-[60px] pt-10">
      <NavLink to="/" className="">
        <Icon id={ICON.LOGO} className="h-[52px] w-[94px] fill-black" />
      </NavLink>
      {/* <nav className="mb-auto flex h-full flex-col gap-3 p-4">
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
        <Icon
          id={ICON.DAY_MODE}
          className="mx-3 my-1 h-6 w-6"
          dataActive={true}
        />
        <Icon
          id={ICON.NIGHT_MODE}
          className="mx-3 my-1 h-6 w-6"
          dataActive={false}
        />
        <Icon id={ICON.LOG_OUT} className="mt-4 h-8 w-8" />
        <Icon id={ICON.FILTER} className="mt-4 h-8 w-8" useStroke />
      </nav> */}
      <nav className="mt-[60px] flex flex-col gap-6 border-b-2 border-[#CECECE] pb-6">
        <SidebarItem icon="vacancy" link="/vacancies" title="Vacancies" />
        <SidebarItem icon="statistics" link="/statistics" title="Statistics" />
        <SidebarItem icon="account" link="/profile" title="Profile" />
        <SidebarItem icon="note" link="/notes" title="Notes" />
      </nav>
    </aside>
  );
}

export default Sidebar;
