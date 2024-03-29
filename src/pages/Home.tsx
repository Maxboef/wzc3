import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Player } from "../types/Player";
import PlayerCard from "../components/molecules/PlayerCard";
import { Match } from "../types/Match";
import MatchView from "../components/molecules/MatchView";
import { HistoryMatch } from "../types/HistoryMatch";

function Home({
  upcommingMatch,
  historyMatches,
}: {
  upcommingMatch: Match | null;
  historyMatches: HistoryMatch[];
}) {
  const [highlightPlayer, setHighlightPlayer] = useState<Player | null>(null);

  const informPlayers = query(
    collection(db, "players"),
    where("inform", "==", true)
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

  useEffect(() => {
    loadInformPlayer();
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
            Mooiste goal op de training
          </h2>

          <PlayerCard player={highlightPlayer} autoShowDetails={true} />
        </>
      )}
    </>
  );
}

export default Home;
