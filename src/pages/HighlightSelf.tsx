import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { getDocs, collection, query, where } from "firebase/firestore";

import { Player } from "../types/Player";
import { AllowedUser } from "../types/AllowedUser";
import PlayerCard from "../components/molecules/PlayerCard";

function HighlightSelf({ allowedUser }: { allowedUser: AllowedUser }) {
  const [ownPlayer, setOwnPlayer] = useState<Player>();

  const selfPlayer = query(
    collection(db, "players"),
    where("id", "==", allowedUser.linked_player_id)
  );

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
        </>
      )}
    </>
  );
}

export default HighlightSelf;
