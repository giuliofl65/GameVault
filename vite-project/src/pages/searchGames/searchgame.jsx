import { useState } from "react";
import { useLocation } from "react-router";
import { PulseLoader } from "react-spinners";
import GameCard from "../../components/GameCard";
import Pagination from "../../components/Pagination";
import useFetchData from "../../hooks/useFetchData";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery();
    const searchQuery = query.get("q") || "";
    const [page, setPage] = useState(1);
    const url = `https://api.rawg.io/api/games?key=d0a2e0e105d14ee2ad9e012e76e9f282&search=${searchQuery}&page_size=20&page=${page}`;

    const { games = [], loading, error } = useFetchData(url);


    return (
        <div className="container-fluid d-flex flex-column mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 d-flex align-items-center">
                    <h1 className="white-1 mb-5 mt-5 ps-3">Search Results for "{searchQuery}"</h1>
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
                <div className="gameWrapper ">
                    {!loading && !error && Array.isArray(games) && games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        <p className="text-white">No games found or invalid data format</p>
                    )}
                </div>
            </div>
        </div>
    );
}
