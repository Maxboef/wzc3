import { Player } from "../../types/Player";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import injuryIcon from "./../../assets/injury.png";

import bronzeCard from "./../../assets/cards/bronze.webp";
import silverCard from "./../../assets/cards/silver.webp";
import goldCard from "./../../assets/cards/gold.webp";

import bronzeInformCard from "./../../assets/cards/bronze-inform.webp";
import silverInformCard from "./../../assets/cards/silver-inform.webp";
import goldInformCard from "./../../assets/cards/gold-inform.webp";

import legendCard from "./../../assets/cards/legend.webp";

import star from "./../../assets/star.svg";

import { AllowedUser } from "../../types/AllowedUser";
import PlayerCardStats from "./PlayerCardStats";

import Tilt from "react-parallax-tilt";

function PlayerCard({
  player,
  autoShowDetails = true,
  allowedUser,
}: {
  player: Player;
  autoShowDetails: boolean;
  allowedUser?: AllowedUser;
}) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const extraStatsRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    animateStats();
  }, [player]);

  const animateStats = () => {
    const tl = gsap.timeline();

    gsap.set(nameRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { opacity: 0 });

    tl.fromTo(
      backgroundRef.current,
      { rotateY: 0, transformOrigin: "50% 50%" },
      { rotateY: 180, duration: 0.5, transformOrigin: "50% 50%" }
    );

    tl.fromTo(
      totalRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(
      positionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(
      extraStatsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    if (autoShowDetails) {
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
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
      <div className={"player-card" + cardClass()}>
        <div className="card-content ">
          <Tilt
            gyroscope={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={25}
            glareEnable={true}
            glareMaxOpacity={0.45}
            glareColor="#0f172a"
            glarePosition="all"
          >
            <figure className="background" ref={backgroundRef}>
              <img src={cardPath()} alt="Bronze card" />
            </figure>

            <div className="player-total" ref={totalRef}>
              {totalScore}
            </div>
            <div className="player-position" ref={positionRef}>
              {player.position}
            </div>

            {player.has_injury && (
              <div className="injury">
                {<img src={injuryIcon} alt="Injury" width={28} />}
              </div>
            )}

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
                  <img src={star} alt="Star" width={13} className="ml-1" />
                </span>
              </div>
              <div className="stars">
                <span className="label">Weak</span>
                <span className="value">
                  {player.weak}
                  <img src={star} alt="Star" width={13} className="ml-1" />
                </span>
              </div>
            </div>

            <PlayerCardStats player={player} allowedUser={allowedUser} />
          </Tilt>
        </div>
      </div>

      {autoShowDetails === false && (
        <button
          className="block mx-auto btn btn-primary px-5 py-3 bg-blue-950 text-white rounded"
          onClick={showDetails}
        >
          Toon speler
        </button>
      )}
    </>
  );
}

export default PlayerCard;
