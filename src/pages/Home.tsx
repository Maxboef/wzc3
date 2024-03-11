import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

import { Player } from "../types/Player";
import PlayerCard from "../components/molecules/PlayerCard";
import { Match } from "../types/Match";
import MatchView from "../components/molecules/MatchView";
import { HistoryMatch } from "../types/HistoryMatch";

let highlightHeader = "Mooiste goal op training";
if (
  new Date().getDay() === 0 ||
  new Date().getDay() === 1 ||
  (new Date().getDay() === 6 && new Date().getHours() > 14)
) {
  highlightHeader = "Man of the match";
}

function Home({
  upcommingMatch,
  historyMatches,
}: {
  upcommingMatch: Match | null;
  historyMatches: HistoryMatch[];
}) {
  const [highlightPlayer, setHighlightPlayer] = useState<Player | null>(null);
  const [newPlayers, setNewPlayers] = useState<Player[]>([]);

  const informPlayers = query(
    collection(db, "players"),
    where("inform", "==", true)
  );

  const newPlayersQuery = query(
    collection(db, "players"),
    where(documentId(), "in", ["Z2DqXrRttJ4oBuYmQTOb", "1P2w45g4McGecwHZxNAF"])
  );

  const loadInformPlayer = async () => {
    const querySnapshot = await getDocs(informPlayers);

    // TODO ugly, but multiple inform players are not supported yet
    querySnapshot.forEach((doc) => {
      const highlightPlayer: Player = {
        id: doc.id,
        name: doc.data().name,
        def: doc.data().def,
        dri: doc.data().dri,
        pac: doc.data().pac,
        pas: doc.data().pas,
        phy: doc.data().phy,
        position: doc.data().position,
        sho: doc.data().sho,
        weak: doc.data().weak,
        skill: doc.data().skill,
        image: doc.data().image,
        cardType: doc.data().cardType,
        inform: doc.data().inform,
        exp: doc.data().exp,
        has_injury: doc.data().has_injury,
      };

      setHighlightPlayer(highlightPlayer);
    });
  };

  const loadNewPlayers = async () => {
    const querySnapshot = await getDocs(newPlayersQuery);

    const newPlayers: Player[] = [];
    // TODO ugly, but multiple inform players are not supported yet
    querySnapshot.forEach((doc) => {
      const newPlayer: Player = {
        id: doc.id,
        name: doc.data().name,
        def: doc.data().def,
        dri: doc.data().dri,
        pac: doc.data().pac,
        pas: doc.data().pas,
        phy: doc.data().phy,
        position: doc.data().position,
        sho: doc.data().sho,
        weak: doc.data().weak,
        skill: doc.data().skill,
        image: doc.data().image,
        cardType: doc.data().cardType,
        inform: doc.data().inform,
        exp: doc.data().exp,
        has_injury: doc.data().has_injury,
      };

      newPlayers.push(newPlayer);
    });

    setNewPlayers(newPlayers);
  };

  useEffect(() => {
    loadInformPlayer();
    loadNewPlayers();
  }, []);

  return (
    <>
      {upcommingMatch !== null && (
        <>
          <h2 className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-4xl	 mt-5">
            Next match
          </h2>
          <MatchView match={upcommingMatch} historyMatches={historyMatches} />
        </>
      )}

      {highlightPlayer !== null && (
        <>
          <h2 className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-2xl	 mt-5">
            {highlightHeader}
          </h2>

          <PlayerCard player={highlightPlayer} autoShowDetails={true} />
        </>
      )}

      {newPlayers.length > 0 && (
        <>
          <h2 className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-2xl	 mt-5">
            New packed cards
          </h2>

          {newPlayers.map((player) => (
            <>
              <PlayerCard player={player} autoShowDetails={true} />
            </>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
