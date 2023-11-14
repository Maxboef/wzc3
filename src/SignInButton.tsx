import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase-auth";

const OnSignIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

function SignInButton() {
  return (
    <button
      className="border inline px-4 py-2 bg-gray-200 text-black rounded"
      onClick={OnSignIn}
    >
      Sign in
    </button>
  );
}

export default SignInButton;
