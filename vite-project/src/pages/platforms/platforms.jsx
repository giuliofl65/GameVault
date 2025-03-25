import { useState } from "react";
import { useParams } from "react-router";
import GameCard from "../../components/GameCard";
import useFetchData from "../../hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import Pagination from "../../components/Pagination";

export default function Platforms() {
  const { platformId } = useParams();
  const [page, setPage] = useState(1);


  const url = `https://api.rawg.io/api/games?key=2604a951527344779ca296442902ebbe&platforms=${platformId}&page=${page}`;
  const platformUrl = `https://api.rawg.io/api/platforms/${platformId}?key=2604a951527344779ca296442902ebbe`;

  const { games, loading, error, platformsName } = useFetchData(
    url,
    platformUrl
  );

  return (
    <div className="container custom_margin_top">
      <h1 className="white-1">Platforms: {platformsName}</h1>

      {loading && <PulseLoader className="m-5" color="#ffffff" />}
      {error && <p className="white-1">Error: {error}</p>}

      <div className="row justify-content-center align-items-center mt-4">
        <Pagination page={page} setPage={setPage} />
      </div>

      <div className="gameWrapper mt-4">
        {games.length > 0
          ? games.map((game) => <GameCard key={game.id} game={game} />)
          : !loading && (
              <p className="white-1">No games found for this platform...</p>
            )}
      </div>
    </div>
  );
}
