import { Player } from "./types/Player";

import bronzeCard from "./assets/cards/bronze.png";

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="player-card">
      <figure className="background">
        <img src={bronzeCard} alt="Bronze card" />
      </figure>

      <div className="player-total">{player.total}</div>
      <div className="player-position">{player.position}</div>

      <div className="player-name">{player.name}</div>

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
