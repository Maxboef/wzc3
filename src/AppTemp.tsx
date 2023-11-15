import { useEffect, useState } from "react";
import { auth } from "./firebase-auth";

import { User, onAuthStateChanged } from "firebase/auth";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

import Header from "./Header";
import PlayerList from "./PlayerList";

import "./App.css";
import { Match } from "./types/Match";
import MatchView from "./MatchView";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [upcommingMatches, setUpcommingMatches] = useState<Match[]>([]);

  useEffect(() => {
    getMatches();
  }, []);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function getMatches() {
    const response = await fetch(
      "https://data.sportlink.com/poule-programma?poulecode=720229&aantaldagen=365&eigenwedstrijden=JA&gebruiklokaleteamgegevens=NEE&client_id=bybEeY5S2Y"
    );
    const data = await response.json();

    setUpcommingMatches(data);
  }

  const matchList = upcommingMatches.map((match) => {
    return <MatchView match={match} />;
  });

  return (
    <div className="bg-blue">
      <Header>
        {user === null && <SignInButton />}
        {user && <SignOutButton />}
      </Header>

      {user && <p>{user.displayName}</p>}

      {matchList}

      {/* {user && <PlayerList />} */}
    </div>
  );
}

export default App;
