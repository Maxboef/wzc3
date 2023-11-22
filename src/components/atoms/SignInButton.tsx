import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase-auth";

import googleSvg from "./assets/google.svg";

const OnSignIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);

  // hier muj nie wete
};

function SignInButton() {
  return (
    <button
      className="px-4 py-1 bg-blue-950 text-white rounded border border-slate-600 flex items-center cursor-pointer"
      onClick={OnSignIn}
    >
      Log in
      <img
        src={googleSvg}
        alt="Google logo"
        width={20}
        className="ml-2 inline"
      />
    </button>
  );
}

export default SignInButton;
