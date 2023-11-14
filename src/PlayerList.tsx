import { useState, useEffect } from "react";

import { db } from "./firebase-auth";
import { getDocs, collection } from "firebase/firestore";

type Player = {
  id: string;
  name: string;
  def: number;
  dri: number;
  pac: number;
  pas: number;
  phy: number;
  position: string;
  sho: number;
  total: number;
}[];

function PlayerList() {
  const [players, setPlayers] = useState<Player>([]);
  const playersCollectionRef = collection(db, "players");

  useEffect(() => {
    const getPlayers = async () => {
      const playersData = await getDocs(playersCollectionRef);

      const data: Player = [];

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
      <ul className="max-w-md space-y-1 list-disc list-inside">
        {players.map((player, idx) => (
          <li key={idx}>{player.name}</li>
        ))}
      </ul>
    </>
  );
}

export default PlayerList;
