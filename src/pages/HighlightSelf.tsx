import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import injuryImage from "../assets/injury.png";

import { Player } from "../types/Player";
import { AllowedUser } from "../types/AllowedUser";
import PlayerCard from "../components/molecules/PlayerCard";

function HighlightSelf({ allowedUser }: { allowedUser: AllowedUser }) {
  const [ownPlayer, setOwnPlayer] = useState<Player>();

  const selfPlayer = query(
    collection(db, "players"),
    where("id", "==", allowedUser.linked_player_id)
  );

  const toggleInjury = async () => {
    const playerRef = doc(db, "players", allowedUser.linked_player_id);

    await updateDoc(playerRef, {
      has_injury: !ownPlayer?.has_injury,
    });

    setOwnPlayer({
      ...ownPlayer!,
      has_injury: !ownPlayer?.has_injury,
    });
  };

  const loadSelf = async () => {
    const querySnapshot = await getDocs(selfPlayer);

    // TODO ugly, but multiple inform players are not supported yet
    querySnapshot.forEach((doc) => {
      const playerSelf: Player = {
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

      setOwnPlayer(playerSelf);
    });
  };

  useEffect(() => {
    loadSelf();
  }, []);

  return (
    <>
      {ownPlayer && (
        <>
          <PlayerCard
            player={ownPlayer}
            autoShowDetails={true}
            allowedUser={allowedUser}
          />

          <button
            onClick={toggleInjury}
            className="m-auto px-4 py-1 bg-blue-950 text-white rounded border border-slate-600 active flex items-center"
          >
            {ownPlayer.has_injury && <>Ik ben weer fit</>}

            {!ownPlayer.has_injury && (
              <>
                Ik heb blessa
                <div className="ml-2 rounded-full border-2 border-red-600 p-1 bg-white">
                  <img src={injuryImage} width={25} />
                </div>
              </>
            )}
          </button>
        </>
      )}
    </>
  );
}

export default HighlightSelf;
