import { Player } from "../../types/Player";

import injuryIcon from "./../../assets/injury.png";

import bronzeCard from "./../../assets/cards/bronze.webp";
import silverCard from "./../../assets/cards/silver.webp";
import goldCard from "./../../assets/cards/gold.webp";

import bronzeInformCard from "./../../assets/cards/bronze-inform.webp";
import silverInformCard from "./../../assets/cards/silver-inform.webp";
import goldInformCard from "./../../assets/cards/gold-inform.webp";

import legendCard from "./../../assets/cards/legend.webp";

function PlayerCardSmall({ player }: { player: Player }) {
  const totalScore = Math.round(
    (player.pac +
      player.sho +
      player.pas +
      player.dri +
      player.def +
      player.phy) /
      6
  );

  const cardPath = () => {
    if (player.cardType === "legend") {
      return legendCard;
    }

    if (totalScore < 60) {
      return player.inform ? bronzeInformCard : bronzeCard;
    }

    if (totalScore < 75) {
      return player.inform ? silverInformCard : silverCard;
    }

    if (totalScore >= 75) {
      return player.inform ? goldInformCard : goldCard;
    }

    return bronzeCard;
  };

  const cardClass = () => {
    if (player.cardType === "legend") {
      return " legend";
    }

    if (player.inform === true) {
      return " inform";
    }

    if (totalScore < 60) {
      return " bronze";
    }

    if (totalScore < 75) {
      return " silver";
    }

    if (totalScore >= 75) {
      return " gold";
    }

    return " bronze";
  };

  return (
    <>
      <div className={"w-5rem player-card small" + cardClass()}>
        <div className="card-content ">
          <figure className="background">
            <img src={cardPath()} alt="Bronze card" />
          </figure>

          {player.has_injury && (
            <div className="injury">
              {<img src={injuryIcon} alt="Injury" width={28} />}
            </div>
          )}

          <div className="player-name">{player.name}</div>

          <div className="player-image">
            {player.image && <img src={player.image} alt={player.name} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerCardSmall;
