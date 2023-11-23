import { useEffect, useState } from "react";
import { Club } from "../types/Club";
import Logo from "../assets/logo.png";
import ClubMatchHistory from "../components/molecules/ClubMatchHistory";
import { HistoryMatch } from "../types/HistoryMatch";

function MatchView({ historyMatches }: { historyMatches: HistoryMatch[] }) {
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
      <div className="flex flex-row w-full mt-2">
        <div className="club-list">
          <div className="bg-blue-500 border-b-2 border-blue-400 h-5"></div>

          {clubList.map((club, index) => {
            return (
              <div
                className={
                  "drop-shadow-xl shadow-2xl w-[12rem] h-[2.5rem] flex flex-row justify-between items-center text-xs font-semibold items-center text-center border-b border-gray-300" +
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
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto flex">
          <div>
            <div className="font-bold flex flex-row justify-between items-center text-center bg-blue-500 border-b-2 border-blue-400 text-xs text-white font-black italic font-roboto h-5">
              <div className="w-[2rem]">G</div>
              <div className="w-[2rem]">W</div>
              <div className="w-[2rem]">G</div>
              <div className="w-[2rem]">V</div>
              <div className="w-[2rem]">Pts</div>
              <div className="w-[2rem]">D</div>
              <div className="w-[2rem]">+</div>
              <div className="w-[2rem]">-</div>
              <div className="w-[8rem]">Laatste 5</div>
            </div>

            {clubList.map((club) => {
              return (
                <div
                  className={
                    "h-[2.5rem] flex flex-row justify-between text-xs font-semibold items-center text-center border-b border-gray-300" +
                    (club.eigenteam === "true" ? " bg-blue-100" : " bg-white")
                  }
                  key={club.clubrelatiecode}
                >
                  <div className="w-[2rem] h-full bg-blue-100 text-semibold flex items-center justify-center">
                    {club.gespeeldewedstrijden}
                  </div>
                  <div className="w-[2rem]">{club.gewonnen}</div>
                  <div className="w-[2rem]">{club.gelijk}</div>
                  <div className="w-[2rem]">{club.verloren}</div>
                  <div className="w-[2rem]">{club.punten}</div>
                  <div className="w-[2rem]">{club.doelsaldo}</div>
                  <div className="w-[2rem]">{club.doelpuntenvoor}</div>
                  <div className="w-[2rem]">{club.doelpuntentegen}</div>
                  <div className="w-[8rem]">
                    <ClubMatchHistory
                      clubString={club.clubrelatiecode}
                      historyMatches={historyMatches}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchView;
