import { useState, useEffect } from "react";

import { db } from "./firebase-auth";
import { getDocs, collection } from "firebase/firestore";

import { Player } from "./types/Player";
import PlayerCard from "./PlayerCard";

function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [indexCounter, setIndexCounter] = useState(0);
  const playersCollectionRef = collection(db, "players");

  useEffect(() => {
    const getPlayers = async () => {
      const playersData = await getDocs(playersCollectionRef);

      let data: Player[] = [];

      playersData.docs.map((player) => {
        const returnData = {
          id: player.id,
          name: player.data().name,
          def: player.data().def,
          dri: player.data().dri,
          pac: player.data().pac,
          pas: player.data().pas,
          phy: player.data().phy,
          position: player.data().position,
          sho: player.data().sho,
          weak: player.data().weak,
          skill: player.data().skill,
          image: player.data().image,
          cardType: player.data().cardType,
          inform: player.data().inform,
          exp: player.data().exp,
        };

        data.push(returnData);
      });

      data = data.sort(() => 0.5 - Math.random());

      return data;
    };

    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const nextPlayer = () => {
    if (indexCounter === players.length - 1) {
      setIndexCounter(0);
      return;
    }

    setIndexCounter(indexCounter + 1);
  };

  return (
    <>
      {players.length && (
        <PlayerCard player={players[indexCounter]} autoShowDetails={false} />
      )}

      {players.length && (
        <button
          onClick={nextPlayer}
          className="block mt-5 mx-auto btn btn-primary px-5 py-3 bg-blue-950 text-white rounded"
        >
          Volgende Speler
        </button>
      )}
    </>
  );
}

export default PlayerList;
