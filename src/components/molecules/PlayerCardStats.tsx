import { Player } from "../../types/Player";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

import { AllowedUser } from "../../types/AllowedUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-auth";

let tl = gsap.timeline();

const statTypes = ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"];

function PlayerCardStats({
  player,
  allowedUser,
  setNewCardPlayer,
}: {
  player: Player;
  setNewCardPlayer: (player: Player) => void;
  allowedUser?: AllowedUser;
}) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [localPlayer, setLocalPlayer] = useState<Player>();

  useEffect(() => {
    setLocalPlayer(player);
    animateStats();
  }, [player]);

  const animateStats = () => {
    tl = gsap.timeline();
    tl.delay(1.5);

    const stats = statsRef.current?.children;

    if (stats) {
      for (let i = 0; i < stats.length; i++) {
        tl.fromTo(
          stats[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.3"
        );
      }
    }
  };

  const userIsLinkedPlayer = () => {
    if (allowedUser && allowedUser.linked_player_id === player.id) {
      return true;
    }

    return false;
  };

  const userHasNoLinkedPlayer = () => {
    if (allowedUser && allowedUser.requested_player_id === "") {
      return true;
    }

    return false;
  };

  const returnStat = (stat: string) => {
    switch (stat) {
      case "PAC":
        return localPlayer?.pac;
      case "SHO":
        return localPlayer?.sho;
      case "PAS":
        return localPlayer?.pas;
      case "DRI":
        return localPlayer?.dri;
      case "DEF":
        return localPlayer?.def;
      case "PHY":
        return localPlayer?.phy;
      default:
        return 0;
    }
  };

  const returnStatLabel = (stat: string) => {
    if (player.position !== "GK") {
      return stat;
    } else {
      switch (stat) {
        case "PAC":
          return "DIV";
        case "SHO":
          return "HAN";
        case "PAS":
          return "KIC";
        case "DRI":
          return "REF";
        case "DEF":
          return "SPD";
        case "PHY":
          return "POS";
        default:
          return 0;
      }
    }
  };

  const requestPlayer = async () => {
    if (!allowedUser || localPlayer === undefined) {
      return;
    }

    await updateDoc(doc(db, "allowed_users", allowedUser.id), {
      requested_player_id: localPlayer.id,
    });
  };

  const increaseStat = async (player: Player, stat: string) => {
    if (!userIsLinkedPlayer() || player.exp < 1 || returnStat(stat) === 99) {
      return;
    }

    tl = gsap.timeline();
    const stats = statsRef.current?.children;
    const keyIndex = statTypes.indexOf(stat);

    if (stats) {
      tl.fromTo(
        stats[keyIndex],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35 }
      );
    }

    switch (stat) {
      case "PAC":
        player.pac += 1;
        break;
      case "SHO":
        player.sho += 1;
        break;
      case "PAS":
        player.pas += 1;
        break;
      case "DRI":
        player.dri += 1;
        break;
      case "DEF":
        player.def += 1;
        break;
      case "PHY":
        player.phy += 1;
        break;
      default:
        break;
    }

    player.exp -= 1;

    setLocalPlayer({ ...player });
    setNewCardPlayer(player);

    await updateDoc(doc(db, "players", player.id), { ...player });
  };

  return (
    <div className="stats" ref={statsRef}>
      {statTypes.map((stat) => (
        <>
          <div className="stat" key={"stat" + stat}>
            <span className="label uppercase">{returnStatLabel(stat)}</span>
            <span className="value">{returnStat(stat)}</span>
          </div>
        </>
      ))}

      {userIsLinkedPlayer() && localPlayer && localPlayer.exp > 0 && (
        <>
          <div className="increase-stats absolute top-16 w-full flex justify-around">
            {statTypes.map((stat) => (
              <>
                <div key={stat}>
                  <button
                    onClick={() => increaseStat(localPlayer, stat)}
                    className="bg-green-500 flex rounded-full h-5 w-5 justify-center items-center"
                  >
                    +
                  </button>
                </div>
              </>
            ))}
          </div>

          <div className="absolute flex w-full mt-24 justify-center ">
            <span className="text-green-500 font-bold italic font-roboto ">
              {localPlayer.exp} EXP
            </span>
          </div>
        </>
      )}

      {userHasNoLinkedPlayer() && localPlayer && (
        <>
          <div
            className="absolute flex w-full justify-center mt-20"
            onClick={() => requestPlayer()}
          >
            <p className="px-5 py-2 bg-blue-950 text-white rounded flex items-center cursor-pointer">
              Dit ben ik
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayerCardStats;
