import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase-auth";

const OnSignIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

function SignInButton() {
  return (
    <button
      className="inline px-4 py-1 bg-blue-950 text-white rounded"
      onClick={OnSignIn}
    >
      Sign in
    </button>
  );
}

export default SignInButton;
