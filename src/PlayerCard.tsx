import { Player } from "./types/Player";

import bronzeCard from "./assets/cards/bronze.png";
import star from "./assets/star.svg";

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="player-card">
      <figure className="background">
        <img src={bronzeCard} alt="Bronze card" />
      </figure>

      <div className="player-total">{player.total}</div>
      <div className="player-position">{player.position}</div>

      <div className="player-name">{player.name}</div>

      <div className="extra-stats">
        <div className="stars">
          <span className="label">Skill</span>
          <span className="value">
            {player.skill}
            <img src={star} alt="Star" width={13} />
          </span>
        </div>
        <div className="stars">
          <span className="label">Weak</span>
          <span className="value">
            {player.weak}
            <img src={star} alt="Star" width={20} />
          </span>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="label">PAC</span>
          <span className="value">{player.pac}</span>
        </div>

        <div className="stat">
          <span className="label">SHO</span>
          <span className="value">{player.sho}</span>
        </div>

        <div className="stat">
          <span className="label">PAS</span>
          <span className="value">{player.pas}</span>
        </div>

        <div className="stat">
          <span className="label">DRI</span>
          <span className="value">{player.dri}</span>
        </div>

        <div className="stat">
          <span className="label">DEF</span>
          <span className="value">{player.def}</span>
        </div>

        <div className="stat">
          <span className="label">PHY</span>
          <span className="value">{player.phy}</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
