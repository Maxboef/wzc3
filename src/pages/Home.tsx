import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Player } from "../types/Player";
import PlayerCard from "../PlayerCard";
import { Match } from "../types/Match";
import MatchView from "../MatchView";

function Home({ upcommingMatch }: { upcommingMatch: Match | null }) {
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
          <MatchView match={upcommingMatch} />
        </>
      )}

      {highlightPlayer !== null && (
        <>
          <h2 className="text-white tracking-tighter font-black italic uppercase font-roboto block text-center text-4xl	 mt-5">
            Player of the week
          </h2>

          <PlayerCard player={highlightPlayer} autoShowDetails={true} />
        </>
      )}
    </>
  );
}

export default Home;
