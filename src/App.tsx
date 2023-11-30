import { useEffect, useState } from "react";
import { auth, db } from "./firebase-auth";

import { User, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import SignInButton from "./components/atoms/SignInButton";
import SignOutButton from "./components/atoms/SignOutButton";

import Header from "./components/organisms/Header";
import PlayerList from "./components/molecules/PlayerList";
import Home from "./pages/Home";
import Standings from "./pages/Standings";
import PlayerStats from "./pages/PlayerStats";
import HighlightSelf from "./pages/HighlightSelf";
import LineUp from "./pages/LineUp";

import "./App.css";
import { Match } from "./types/Match";
import MatchView from "./components/molecules/MatchView";
import { AllowedUser } from "./types/AllowedUser";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Nav from "./components/organisms/Nav";
import { HistoryMatch } from "./types/HistoryMatch";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [upcommingMatches, setUpcommingMatches] = useState<Match[]>([]);
  const [allowedUser, setAllowedUser] = useState<AllowedUser | null>(null);
  const [historyMatches, setHistoryMatches] = useState<HistoryMatch[]>([]);

  useEffect(() => {
    getMatches();
    getHistoryMatches();
  }, []);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    initAllowedUser();
  });

  async function getMatches() {
    const response = await fetch(
      "https://data.sportlink.com/poule-programma?poulecode=720229&aantaldagen=365&eigenwedstrijden=JA&gebruiklokaleteamgegevens=NEE&client_id=bybEeY5S2Y"
    );
    const data = await response.json();

    setUpcommingMatches(data);
  }

  async function getHistoryMatches() {
    const response = await fetch(
      "https://data.sportlink.com/pouleuitslagen?aantaldagen=180&weekoffset=-10&poulecode=720229&eigenwedstrijden=NEE&sorteervolgorde=datum-omgekeerd&gebruiklokaleteamgegevens=NEE&client_id=bybEeY5S2Y"
    );
    const data = await response.json();

    setHistoryMatches(data);
  }

  const initAllowedUser = async () => {
    if (user === null || allowedUser !== null) {
      return;
    }

    const docRef = doc(db, "allowed_users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const allowedUser = { ...docSnap.data(), id: docSnap.id };
      setAllowedUser(allowedUser as AllowedUser);
    } else {
      await setDoc(doc(db, "allowed_users", user.uid), {
        linked_player_id: "",
        requested_player_id: "",
        email: user.email,
        allowed: false,
        is_admin: false,
      });
    }
  };

  const matchList = upcommingMatches.map((match) => {
    return <MatchView match={match} />;
  });

  const layout = () => {
    return (
      <>
        <Header>
          {user && allowedUser && allowedUser.linked_player_id && (
            <NavLink
              to="/eigen-card"
              className="px-4 py-1 bg-blue-950 text-white rounded border border-slate-600 flex items-center cursor-pointer"
            >
              Eigen Card
            </NavLink>
          )}

          {user === null && <SignInButton />}
          {user && <SignOutButton />}
        </Header>

        <Nav user={user} allowedUser={allowedUser} />

        <Outlet />
      </>
    );
  };

  return (
    <div className="bg-slate-900 overflow-x-hidden max-w-3xl m-auto">
      <Routes>
        <Route path="/" element={layout()}>
          <Route
            index
            element={
              <Home
                upcommingMatch={
                  upcommingMatches.length > 0 ? upcommingMatches[0] : null
                }
                historyMatches={historyMatches?.length ? historyMatches : []}
              />
            }
          />
          <Route path="/matches" element={matchList} />

          <Route
            path="/stand"
            element={
              <Standings
                historyMatches={historyMatches?.length ? historyMatches : []}
              />
            }
          />

          {user && allowedUser && allowedUser.allowed && (
            <Route
              path="/eigen-card"
              element={<HighlightSelf allowedUser={allowedUser} />}
            />
          )}

          {user && allowedUser && allowedUser.allowed && (
            <Route
              path="players"
              element={<PlayerList allowedUser={allowedUser} />}
            />
          )}
          {user && allowedUser && allowedUser.is_admin && (
            <Route path="stats" element={<PlayerStats />} />
          )}
          {user && allowedUser && allowedUser.is_admin && (
            <Route path="line-up" element={<LineUp />} />
          )}
          <Route
            path="*"
            element={
              <p className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-4xl	mt-5">
                Hier muj nie zijn
              </p>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
