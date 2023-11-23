import { HistoryMatch } from "../../types/HistoryMatch";
import { Match } from "../../types/Match";
import Logo from "./../../assets/logo.png";
import ClubMatchHistory from "./ClubMatchHistory";

interface Props {
  match: Match;
  historyMatches?: HistoryMatch[];
}

function formatPath(relationCode: string) {
  if (relationCode === "BBKZ50J") {
    return Logo;
  }

  return "https://logoapi.voetbal.nl/logo.php?clubcode=" + relationCode;
}

function formatDate(date: string) {
  const options = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

  return new Date(date).toLocaleDateString("nl-NL", options);
}

function formatAttendTime(match: Match) {
  const options = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };

  const date = new Date(match.wedstrijddatum);
  date.setHours(date.getHours() - 1);

  if (match.thuisteamclubrelatiecode !== "BBKZ50J") {
    date.setMinutes(date.getMinutes() - 15);
  }

  return date.toLocaleTimeString("nl-NL", options);
}

function MatchView({ match, historyMatches }: Props) {
  return (
    <div className="m-2 bg-white bg-slate-100 mb-5 rounded">
      <div className="bg-blue-500 py-0.5 border-b-2 border-blue-400 text-center text-xs text-white font-black italic uppercase font-roboto">
        {formatDate(match.datum)}
      </div>

      <div className="py-2 grid gap-4 grid-cols-3 items-center justify-items-center">
        <div className="text-center">
          <img
            src={formatPath(match.thuisteamclubrelatiecode)}
            className="w-[3rem] m-auto"
          />
          <span className="text-xs font-semibold font-sans">
            {match.thuisteam}
          </span>

          <ClubMatchHistory
            clubString={match.thuisteamclubrelatiecode}
            historyMatches={historyMatches?.length ? historyMatches : []}
          />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center font-semibold text-sm">
            <span className="block">
              <span className="font-normal text-xs w-[4rem] inline-block">
                Wedstrijd
              </span>
              {match.aanvangstijd}
            </span>
            <span className="block">
              <span className="font-normal text-xs w-[4rem] inline-block">
                Aanvang
              </span>
              {formatAttendTime(match)}
            </span>
            <span className="block">
              <span className="font-normal text-xs w-[4rem] inline-block  text-center">
                Wassen
              </span>
              Werner
            </span>
          </div>
        </div>
        <div className="text-center">
          <img
            src={formatPath(match.uitteamclubrelatiecode)}
            className="w-[3rem] m-auto"
          />
          <span className="text-xs font-semibold">{match.uitteam}</span>
          <ClubMatchHistory
            clubString={match.uitteamclubrelatiecode}
            historyMatches={historyMatches?.length ? historyMatches : []}
          />
        </div>
      </div>
    </div>
  );
}

export default MatchView;
