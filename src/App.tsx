import { useState } from "react";
import { auth } from "./firebase-auth";

import { User, onAuthStateChanged } from "firebase/auth";

import LandingMessage from "./LandingMessage";
import Alert from "./Alert";
import SignInButton from "./SignInButton";
import Header from "./Header";
import PlayerList from "./PlayerList";

import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const users = ["User 1", "User 2", "User 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <Header user={user} auth={auth} />

      {user && <p>Hi {user.displayName}</p>}

      {user === null && <SignInButton />}

      <Alert>
        <h1 className="inline">TETETE</h1>
      </Alert>

      <LandingMessage
        heading={"Test"}
        items={users}
        onSelectItem={handleSelectItem}
      />

      {user && <PlayerList />}
    </>
  );
}

export default App;
