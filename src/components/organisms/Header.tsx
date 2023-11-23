import logo from "./../../assets/logo.png";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | null;
}

function Header({ children }: Props) {
  return (
    <header className="bg-blue-900 text-slate-100 px-5 py-2 flex flex-row justify-between items-center">
      <a href={`/`}>
        <img src={logo} alt="Logo" className="w-[2rem]" />
      </a>
      {children}
    </header>
  );
}

export default Header;
