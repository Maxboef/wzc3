import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

import { Player } from "../types/Player";
import AllowedUsers from "./AllowedUsers";

function PlayerStats() {
  const [players, setPlayers] = useState<Player[]>([]);

  const playersCollectionRef = collection(db, "players");

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

    setPlayers(data);
  };

  useEffect(() => {
    getPlayers();
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

  const toggleInform = async (player: Player) => {
    const playerRef = doc(db, "players", player.id);

    await updateDoc(playerRef, {
      inform: !player.inform,
    });

    player.inform = !player.inform;
  };

  return (
    <>
      {players.length && (
        <>
          <div className="bg-white">
            {players.map((player) => (
              <div
                className="flex flex justify-between items-center px-3 py-3 border-b text-sm text-bold"
                key={player.id}
              >
                <div className="w-[4rem]">{player.name}</div>
                <div>
                  <button
                    className={
                      "inline px-4 py-1 bg-blue-950 text-white rounded" +
                      (player.inform ? " bg-green-500" : "")
                    }
                    onClick={() => toggleInform(player)}
                  >
                    {player.inform ? "Is Inform" : "Set Inform"}
                  </button>
                </div>
                <div>{player.exp}</div>
                <div>
                  <button
                    className="inline px-4 py-1 bg-blue-950 text-white rounded"
                    onClick={() => addExpToPlayer(player, 2)}
                  >
                    + Exp
                  </button>
                </div>
                <div>
                  <button
                    className="inline px-4 py-1 bg-blue-950 text-white rounded"
                    onClick={() => addExpToPlayer(player, -2)}
                  >
                    - Exp
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

      <AllowedUsers />
    </>
  );
}

export default PlayerStats;
