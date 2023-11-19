import { useEffect, useState } from "react";
import { Club } from "../types/Club";
import Logo from "../assets/Logo.png";

function MatchView() {
  const [clubList, setClublist] = useState<Club[]>([]);

  function formatPath(relationCode: string) {
    if (relationCode === "BBKZ50J") {
      return Logo;
    }

    return "https://logoapi.voetbal.nl/logo.php?clubcode=" + relationCode;
  }

  async function getClubs() {
    const response = await fetch(
      "https://data.sportlink.com/poulestand?poulecode=720229&gebruiklokaleteamgegevens=NEE&client_id=bybEeY5S2Y"
    );
    const data = await response.json();

    setClublist(data);
  }

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <>
      <div className="mt-2 bg-blue-500 border-b-2 border-blue-400 text-center text-xs text-white font-black italic uppercase font-roboto grid grid-cols-11 gap-4">
        <div></div>
        <div></div>
        <div></div>
        <div className="font-bold">G</div>
        <div className="font-bold">W</div>
        <div className="font-bold">G</div>
        <div className="font-bold">V</div>
        <div className="font-bold">P</div>
        <div className="font-bold">D</div>
        <div className="font-bold">+</div>
        <div className="font-bold">-</div>
      </div>

      {clubList.map((club, index) => {
        return (
          <div
            className={
              "py-1 bg-white grid grid-cols-11 gap-4 text-xs font-semibold justify-items-center align-middle items-center border-b border-gray-300" +
              (club.eigenteam === "true" ? " bg-blue-100" : "")
            }
            key={club.clubrelatiecode}
          >
            <div className="flex flex-row justify-center items-center">
              <span className="font-bold inline-block h-4 ml-2 mr-2 text-center">
                {index + 1}
              </span>
              <img
                src={formatPath(club.clubrelatiecode)}
                width={32}
                height={28}
              />
            </div>
            <div className="col-span-2 text-center">{club.teamnaam}</div>
            <div className="">{club.gespeeldewedstrijden}</div>
            <div>{club.gewonnen}</div>
            <div>{club.gelijk}</div>
            <div>{club.verloren}</div>
            <div>{club.punten}</div>
            <div>{club.doelsaldo}</div>
            <div>{club.doelpuntenvoor}</div>
            <div>{club.doelpuntentegen}</div>
          </div>
        );
      })}
    </>
  );
}

export default MatchView;
