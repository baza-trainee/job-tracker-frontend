import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex w-full max-w-64 flex-col bg-gray-900 text-white">
      <div className="p-4 text-2xl font-bold">Logo</div>
      <nav className="mb-auto flex h-full flex-col gap-3 p-4">
        <Link to="/opportunities" className="rounded p-2 hover:bg-gray-700">
          Opportunities
        </Link>
        <Link to="/matches" className="rounded p-2 hover:bg-gray-700">
          Matches
        </Link>
        <Link to="/search" className="rounded p-2 hover:bg-gray-700">
          Search
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
