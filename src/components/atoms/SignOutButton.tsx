import { signOut } from "firebase/auth";
import { auth } from "../../firebase-auth";

function SignOutButton() {
  const logOut = () => {
    signOut(auth);
  };

  return (
    <div
      className="px-4 py-1 bg-blue-950 text-white rounded border border-slate-600 flex items-center cursor-pointer"
      onClick={logOut}
    >
      Log uit
    </div>
  );
}

export default SignOutButton;
