import { Player } from "./types/Player";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import bronzeCard from "./assets/cards/bronze.png";
import star from "./assets/star.svg";

function PlayerCard({ player }: { player: Player }) {
  const nameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const extraStatsRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    animateStats();
  }, [player]);

  const animateStats = () => {
    const tl = gsap.timeline();

    gsap.set(nameRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { opacity: 0 });

    // animate each stat individually
    const stats = statsRef.current?.children;
    if (stats) {
      for (let i = 0; i < stats.length; i++) {
        tl.fromTo(
          stats[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }
    }

    tl.fromTo(
      extraStatsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(
      positionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  };

  const showDetails = () => {
    gsap.to(nameRef.current, { opacity: 1, duration: 0.5 });
    gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
  };

  const totalScore = Math.round(
    (player.pac +
      player.sho +
      player.pas +
      player.dri +
      player.def +
      player.phy) /
      6
  );

  return (
    <>
      <div className="player-card">
        <figure className="background">
          <img src={bronzeCard} alt="Bronze card" />
        </figure>

        <div className="player-total">{totalScore}</div>
        <div className="player-position" ref={positionRef}>
          {player.position}
        </div>

        <div className="player-name" ref={nameRef}>
          {player.name}
        </div>

        <div className="player-image">
          {player.image && (
            <img src={player.image} alt={player.name} ref={imageRef} />
          )}
        </div>

        <div className="extra-stats" ref={extraStatsRef} key="{player.id}">
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
              <img src={star} alt="Star" width={13} />
            </span>
          </div>
        </div>

        <div className="stats" ref={statsRef}>
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

      <button
        className="block mx-auto btn btn-primary px-5 py-3 bg-blue-950 text-white rounded"
        onClick={showDetails}
      >
        Toon speler
      </button>
    </>
  );
}

export default PlayerCard;
