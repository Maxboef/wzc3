import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

import { Player } from "../types/Player";

function PlayerStats() {
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
          weak: player.data().weak,
          skill: player.data().skill,
          image: player.data().image,
          cardType: player.data().cardType,
          inform: player.data().inform,
          exp: player.data().exp,
        };

        data.push(returnData);
      });

      return data;
    };

    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  // const StorePlayer = async () => {
  //   // ignore this function
  //   const obj = {
  //     name: "Niek",
  //     cardType: "bronze",
  //     def: 41,
  //     dri: 50,
  //     pac: 41,
  //     pas: 52,
  //     phy: 52,
  //     sho: 69,
  //     position: "CS",
  //     weak: 2,
  //     skill: 5,
  //     image: "",
  //   };

  //   // Average is of object is 50

  //   await addDoc(collection(db, "players"), obj);
  // };

  const addPlayer = () => {
    // StorePlayer();
  };

  const addExpToPlayer = async (player: Player, amount: number) => {
    const playerRef = doc(db, "players", player.id);

    await updateDoc(playerRef, {
      exp: player.exp + amount,
    });
  };

  const allExp = () => {
    players.map(async (player) => {
      addExpToPlayer(player, 2);
    });
  };

  return (
    <>
      {players.length && (
        <>
          <div className="bg-white">
            {players.map((player) => (
              <div className="grid grid-cols-11 gap-4 py-3 border-b text-sm">
                <div>{player.name}</div>
                <div>{player.inform ? "Inform" : ""}</div>
                <div>{player.exp}</div>
                <div>
                  <button
                    className="inline px-4 py-1 bg-blue-950 text-white rounded"
                    onClick={() => addExpToPlayer(player, 2)}
                  >
                    Exp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={allExp}
        className="block mt-5 mx-auto btn btn-primary px-5 py-3 bg-blue-950 text-white rounded"
      >
        Iedereen exp
      </button>

      <button
        onClick={addPlayer}
        className="block mt-5 mx-auto btn btn-primary px-5 py-3 bg-blue-950 text-white rounded"
      >
        Add Speler
      </button>
    </>
  );
}

export default PlayerStats;
