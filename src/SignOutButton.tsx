import { signOut } from "firebase/auth";
import { auth } from "./firebase-auth";

function SignOutButton() {
  const logOut = () => {
    signOut(auth);
  };

  return (
    <div
      className="inline px-4 py-1 bg-blue-950 text-white rounded"
      onClick={logOut}
    >
      Log out
    </div>
  );
}

export default SignOutButton;
