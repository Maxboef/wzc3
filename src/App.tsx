import LandingMessage from "./LandingMessage";
import Alert from "./Alert";
import Header from "./Header";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log(user.uid);
  }
});

function App() {
  const users = ["User 1", "User 2", "User 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <Header />
      {auth.currentUser && <p>Hi {auth.currentUser.displayName}</p>}
      rere
      {auth.currentUser === null && SignIn()}
      <Alert>
        <h1 className="inline">TETETE</h1>
      </Alert>
      <LandingMessage
        heading={"Test"}
        items={users}
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

function SignIn() {
  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  return (
    <button
      className="border inline px-4 py-2 bg-gray-200 text-black rounded"
      onClick={signIn}
    >
      Sign in
    </button>
  );
}

export default App;
