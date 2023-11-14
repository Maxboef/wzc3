import { Auth, User, signOut } from "firebase/auth";

interface Props {
  auth: Auth;
  user: User | null;
}

function Header({ auth, user }: Props) {
  const logOut = () => {
    signOut(auth);
  };

  return (
    <header className="bg-black text-slate-100 px-5 py-4 flex flex-row justify-between items-center">
      <h4 className="leading-7">Header</h4>

      {user && (
        <div
          className="inline px-4 py-2 bg-gray-200 text-black rounded"
          onClick={logOut}
        >
          Log out
        </div>
      )}
    </header>
  );
}

export default Header;
