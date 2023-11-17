import { useState, useEffect } from "react";

import { db } from "./firebase-auth";
import { getDocs, collection } from "firebase/firestore";

import { Player } from "./types/Player";
import PlayerCard from "./PlayerCard";

function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const playersCollectionRef = collection(db, "players");

  useEffect(() => {
    const getPlayers = async () => {
      const playersData = await getDocs(playersCollectionRef);

      const data: Player[] = [];

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
          total: player.data().total,
          weak: player.data().weak,
          skill: player.data().skill,
        };

        data.push(returnData);
      });

      return data;
    };

    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
    <>
      {players.map((player, idx) => (
        <PlayerCard key={idx} player={player} />
      ))}
    </>
  );
}

export default PlayerList;
