import { Match } from "./types/Match";

interface Props {
  match: Match;
}

function formatPath(relationCode: string) {
  return "https://logoapi.voetbal.nl/logo.php?clubcode=" + relationCode;
}

function formatDate(date: string) {
  // options for TSX
  const options = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

  return new Date(date).toLocaleDateString("nl-NL", options);
}

function MatchView({ match }: Props) {
  return (
    <div className="m-2 bg-white bg-slate-100 mb-5">
      <div className="text-center text-sm font-semibold text-white bg-blue-500 py-0.5">
        {formatDate(match.datum)}
      </div>

      <div className="py-2 grid gap-4 grid-cols-3 items-center justify-items-center">
        <div className="text-center">
          <img
            src={formatPath(match.thuisteamclubrelatiecode)}
            className="w-[3rem] m-auto"
          />
          <span className="text-xs font-semibold">{match.thuisteam}</span>
        </div>
        <div>
          <div>Aanvang:{match.aanvangstijd}</div>
        </div>
        <div className="text-center">
          <img
            src={formatPath(match.uitteamclubrelatiecode)}
            className="w-[3rem] m-auto"
          />
          <span className="text-xs font-semibold">{match.uitteam}</span>
        </div>
      </div>
    </div>
  );
}

export default MatchView;
