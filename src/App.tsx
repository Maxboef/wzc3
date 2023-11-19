import { useEffect, useState } from "react";
import { auth, db } from "./firebase-auth";

import { User, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

import Header from "./Header";
import PlayerList from "./PlayerList";
import PlayerHighlight from "./pages/PlayerHighlight";
import Standings from "./pages/Standings";
import PlayerStats from "./pages/PlayerStats";

import "./App.css";
import { Match } from "./types/Match";
import MatchView from "./MatchView";
import { AllowedUser } from "./types/AllowedUser";
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [upcommingMatches, setUpcommingMatches] = useState<Match[]>([]);

  const [allowedUser, setAllowedUser] = useState<AllowedUser | null>(null);

  useEffect(() => {
    getMatches();
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

  const initAllowedUser = async () => {
    if (user === null || allowedUser !== null) {
      return;
    }

    const docRef = doc(db, "allowed_users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAllowedUser(docSnap.data() as AllowedUser);
    } else {
      await setDoc(doc(db, "allowed_users", user.uid), {
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
      <div>
        <Header>
          {user === null && <SignInButton />}
          {user && <SignOutButton />}
        </Header>

        <nav className="main-nav border-b border-slate-900 bg-slate-100">
          <ul className=" text-sm font-medium text-center text-gray-900 rounded-lg shadow flex dark:divide-gray-700 justify-evenly">
            <li className="me-2">
              <NavLink
                to="/"
                className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Dashboard
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/matches"
                className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Programma
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/stand"
                className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Stand
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/players"
                className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Players
              </NavLink>
            </li>

            {user && allowedUser && allowedUser.is_admin && (
              <li className="me-2">
                <NavLink
                  to="/stats"
                  className="text-xs inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
                >
                  Stats
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Outlet />
      </div>
    );
  };

  return (
    <div className="bg-slate-900">
      <Routes>
        <Route path="/" element={layout()}>
          <Route index element={<PlayerHighlight />} />

          <Route path="/matches" element={matchList} />

          <Route path="/stand" element={<Standings />} />

          {user && allowedUser && allowedUser.allowed && (
            <Route path="players" element={<PlayerList />} />
          )}

          {user && allowedUser && allowedUser.is_admin && (
            <>
              <Route path="stats" element={<PlayerStats />} />
            </>
          )}

          <Route
            path="*"
            element={
              <p className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-4xl	mt-5">
                Nope
              </p>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
