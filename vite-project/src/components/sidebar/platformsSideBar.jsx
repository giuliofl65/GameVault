import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

export default function PlatformSideBar() {
  const updateUrl =
    "https://api.rawg.io/api/platforms?key=2604a951527344779ca296442902ebbe";
  const { games: platforms, loading, error } = useFetchData(updateUrl);
  const [showMore, setShowMore] = useState(false);
  const visiblePlatforms = showMore ? platforms : platforms.slice(0, 6);

  return (
    <div className="sidenav">
      {loading && <PulseLoader className="m-5" color="#ffffff" />}
      {error && (
        <div className="text-center text-danger">
          <p>Error: {error}</p>
        </div>
      )}

      <ul className="list-unstyled">
        {visiblePlatforms.length > 0 ? (
          visiblePlatforms.map((platform) => (
            <li key={platform.id}>
              <Link
                to={`/platform/${platform.id}`}
                className="white-2 side-link"
              >
                {platform.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No platforms found</p>
        )}
      </ul>

      {platforms.length > 6 && (
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
