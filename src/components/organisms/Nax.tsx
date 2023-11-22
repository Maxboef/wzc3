import { User } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { AllowedUser } from "../../types/AllowedUser";

function Nav({
  user,
  allowedUser,
}: {
  user: User | null;
  allowedUser: AllowedUser | null;
}) {
  return (
    <nav className="main-nav border-b border-slate-900 bg-slate-100">
      <ul className=" text-sm font-medium text-center text-gray-900 rounded-lg shadow flex dark:divide-gray-700 justify-evenly">
        <li className="me-2">
          <NavLink
            to="/"
            className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:border-gray-400 group "
          >
            Dashboard
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/matches"
            className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:border-gray-400 group "
          >
            Programma
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/stand"
            className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:border-gray-400 group "
          >
            Stand
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/players"
            className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
          >
            Players
          </NavLink>
        </li>

        {user && allowedUser && allowedUser.is_admin && (
          <li className="me-2">
            <NavLink
              to="/stats"
              className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
            >
              Stats
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
