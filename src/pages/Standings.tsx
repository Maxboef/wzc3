import { useEffect, useState } from "react";
import { Club } from "../types/Club";
import Logo from "../assets/logo.png";

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
      <div className="mt-2 flex flex-row justify-between items-center text-center bg-blue-500 border-b-2 border-blue-400 text-xs text-white font-black italic uppercase font-roboto ">
        <div className="w-[11.5rem]"></div>
        <div className="w-[1.5rem] font-bold">G</div>
        <div className="w-[1.5rem] font-bold">W</div>
        <div className="w-[1.5rem] font-bold">G</div>
        <div className="w-[1.5rem] font-bold">V</div>
        <div className="w-[1.5rem] font-bold">P</div>
        <div className="w-[1.5rem] font-bold">D</div>
        <div className="w-[1.5rem] font-bold">+</div>
        <div className="w-[1.5rem] font-bold pr-3">-</div>
      </div>

      {clubList.map((club, index) => {
        return (
          <div
            className={
              "flex flex-row justify-between items-center text-xs font-semibold items-center text-center border-b border-gray-300" +
              (club.eigenteam === "true" ? " bg-blue-100" : " bg-white")
            }
            key={club.clubrelatiecode}
          >
            <div className="flex flex-row justify-center items-center py-0.5">
              <span className="font-bold inline-block h-4 ml-2 mr-2 w-[1rem]">
                {index + 1}
              </span>
              <img src={formatPath(club.clubrelatiecode)} width={28} />
              <div className="w-[8rem] pl-2 text-left">{club.teamnaam}</div>
            </div>
            <div className="w-[1.5rem] bg-blue-100 py-3 text-semibold">
              {club.gespeeldewedstrijden}
            </div>
            <div className="w-[1.5rem]">{club.gewonnen}</div>
            <div className="w-[1.5rem]">{club.gelijk}</div>
            <div className="w-[1.5rem]">{club.verloren}</div>
            <div className="w-[1.5rem]">{club.punten}</div>
            <div className="w-[1.5rem]">{club.doelsaldo}</div>
            <div className="w-[1.5rem]">{club.doelpuntenvoor}</div>
            <div className="w-[1.5rem]">{club.doelpuntentegen}</div>
          </div>
        );
      })}
    </>
  );
}

export default MatchView;
