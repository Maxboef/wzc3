import { Auth, User, signOut } from "firebase/auth";

import logo from "./assets/logo.png";
import { ReactNode } from "react";

interface Props {
  auth: Auth;
  user: User | null;
  children: ReactNode | null;
}

function Header({ auth, user, children }: Props) {
  const logOut = () => {
    signOut(auth);
  };

  return (
    <header className="bg-blue-900 text-slate-100 px-5 py-2 flex flex-row justify-between items-center">
      <img src={logo} alt="Logo" className="w-[2rem]" />

      {user && (
        <div
          className="inline px-4 py-1 bg-blue-950 text-white rounded"
          onClick={logOut}
        >
          Log out
        </div>
      )}

      {children}
    </header>
  );
}

export default Header;
