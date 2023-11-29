import { useState, useEffect, useLayoutEffect, useRef } from "react";

import { db } from "../firebase-auth";
import { getDocs, collection } from "firebase/firestore";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

import { Player } from "../types/Player";
import PlayerCardSmall from "../components/molecules/PlayerCardSmall";

gsap.registerPlugin(Draggable);

function PlayerStats() {
  const fieldRef = useRef<HTMLDivElement>(null);
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
        has_injury: player.data().has_injury,
      };

      data.push(returnData);
    });

    setPlayers(data);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useLayoutEffect(() => {}, []);

  const initField = () => {
    // position all players under each other, with a little offset

    Draggable.create(".player-card", {
      bounds: fieldRef.current,
      type: "x,y",
      inertia: true,
      throwProps: true,
      onDragStart: function () {
        this.startX = this.x;
        this.startY = this.y;
      },
      onDragEnd: function () {
        this.endX = this.x;
        this.endY = this.y;
      },
    });
  };

  return (
    <>
      <button
        onClick={initField}
        className="px-4 py-1 bg-blue-950 text-white rounded border border-slate-600 flex items-center cursor-pointer"
      >
        Start
      </button>

      <div ref={fieldRef} className="field h-screen flex px-2">
        <div className="outside w-[5rem] h-full bg-lime-700">
          {players.map((player, index) => (
            <PlayerCardSmall player={player} key={index} />
          ))}
        </div>

        <div className="inside w-full h-full bg-lime-500 border-4 border-white"></div>
      </div>
    </>
  );
}

export default PlayerStats;
