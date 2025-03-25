import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

export default function GenresSideBar() {
  const updateUrl =
    "https://api.rawg.io/api/genres?key=2604a951527344779ca296442902ebbe";
  const { games, loading, error } = useFetchData(updateUrl);
  const [showMore, setShowMore] = useState(false);
  const visibleGenres = showMore ? games : games.slice(0, 6);

  return (
    <div className="sidenav">
      {loading && <PulseLoader className="m-5" color="#ffffff" />}
      {error && (
        <div className="text-center text-danger">
          <p>Errore: {error}</p>
        </div>
      )}

      <ul className="list-unstyled">
        {visibleGenres.length > 0 ? (
          visibleGenres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/genre/${genre.slug}`} className="white-2 side-link">
                {genre.name}
              </Link>
            </li>
          ))
        ) : (
          <p>Not genres</p>
        )}
      </ul>

      {games.length > 6 && (
        <button
          className="show-more rounded bg-medium-grey-1 white-1"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
