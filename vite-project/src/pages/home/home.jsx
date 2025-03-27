import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import GameCard from "../../components/gameCard";
import { PulseLoader } from "react-spinners";
import Pagination from "../../components/pagination";

export default function Home() {
  const [page, setPage] = useState(1);
  const url = `https://api.rawg.io/api/games?key=2604a951527344779ca296442902ebbe&dates=2019-01-01,2024-12-31&page=${page}&page_size=20`;
  const { games, loading, error } = useFetchData(url);

  return (
    <>
      <div className="container-fluid d-flex flex-column mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 d-flex align-items-center">
            <h1 className="white-1 mb-5 mt-5 ps-3">A lot of games..</h1>
            {loading && <PulseLoader className="m-5" color="#ffffff" />}
          </div>
        </div>
        <div className="row me-2">
          <div className="col-12 d-flex justify-content-end align-items-center">
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>

        <div className="row">
          {error && (
            <div className="text-center text-danger">
              <p>Errore: {error}</p>
            </div>
          )}
          <div className="gameWrapper">
            {!loading &&
              !error &&
              games.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
        </div>
      </div>
    </>
  );
}
