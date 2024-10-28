import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-900 p-2 text-2xl text-white">
      <Link to="/" className="rounded p-2 hover:bg-slate-500">
        Job Tracker
      </Link>
      <span>USER</span>
    </header>
  );
}

export default Header;
