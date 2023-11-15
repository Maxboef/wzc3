import { useEffect, useState } from "react";

import Header from "./Header";

import "./App.css";
import { Match } from "./types/Match";
import MatchView from "./MatchView";

function App() {
  const [upcommingMatches, setUpcommingMatches] = useState<Match[]>([]);

  useEffect(() => {
    getMatches();
  }, []);

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
    <div className="bg-slate-900">
      <Header>
        <div></div>
      </Header>

      {matchList}
    </div>
  );
}

export default App;
