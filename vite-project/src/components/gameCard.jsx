import { useState } from "react";
import { useNavigate } from "react-router";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const safeGet = (obj, path, fallback = "") => {
    return (
      path.split(".").reduce((acc, part) => acc && acc[part], obj) || fallback
    );
  };

  return (
    <div
      className="card game-card bg-dark-1 white-1 mb-3 shadow-lg rounded-3 overflow-hidden position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        navigate(`/game/${safeGet(game, "id")}/${safeGet(game, "name")}`)
      }
    >
      <img
        className="card-img-top"
        src={safeGet(game, "background_image", "default-image.jpg")}
        alt={safeGet(game, "name", "Unknown Game")}
      />
      <div className="card-body d-flex flex-column align-items-center">
        <h4 className="card-title text-center">
          {safeGet(game, "name", "Unknown Game")}
        </h4>
        <div className="d-flex gap-3 align-items-center justify-content-center card-info">
          <p className="bg-light-grey-3 rounded-1 px-2 py-1 shadow d-flex align-items-center">
            <i className="bi bi-star-fill me-1"></i>
            {safeGet(game, "rating", "N/A")}/
            {safeGet(game, "rating_top", "N/A")}
          </p>
          <p className="bg-light-grey-3 rounded-1 px-2 py-1 shadow d-flex align-items-center">
            <i className="bi bi-heart-fill me-1"></i>
            {safeGet(game, "added", "N/A")}
          </p>
        </div>
      </div>
      {isHovered && (
        <div className="extra-info p-3 card-overlay">
          <p>
            <strong>Date of release:</strong> {safeGet(game, "released", "N/A")}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}
          </p>
          <p>
            <strong>Platforms:</strong>{" "}
            {game.platforms
              ? game.platforms.map((p) => p.platform.name).join(", ")
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
