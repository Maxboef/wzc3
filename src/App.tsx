import { useEffect, useState } from "react";
import { auth } from "./firebase-auth";

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
                className="inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Dashboard
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/matches"
                className="inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Programma
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/stand"
                className="inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
              >
                Stand
              </NavLink>
            </li>
            <li className="me-2">
              <NavLink
                to="/players"
                className="inline-block  py-3 px-4 text-gray-400 cursor-not-allowed"
              >
                Players
              </NavLink>
            </li>

            {user && user.uid === "2kWK1rUGjEZM5qS5QWzWakDRpHA2" && (
              <li className="me-2">
                <NavLink
                  to="/stats"
                  className="inline-flex items-center justify-center py-3 px-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-400 group "
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

          {user && user.uid === "2kWK1rUGjEZM5qS5QWzWakDRpHA2" && (
            <>
              <Route path="players" element={<PlayerList />} />
              <Route path="stats" element={<PlayerStats />} />
            </>
          )}

          <Route path="*" element={<p>Nope</p>} />
        </Route>
      </Routes>

      {user && <p>{user.uid}</p>}
    </div>
  );
}

export default App;
