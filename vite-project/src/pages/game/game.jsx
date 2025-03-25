import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import SessionContext from "../../context/sessionContext";
import supabase from "../../supabase/client";
import { toast, Toaster } from "sonner";
import Chat from "./components/Chat";
import ReviewSection from "./components/reviews";

export default function Game() {
  const { session } = useContext(SessionContext);
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [fav, setFav] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=2604a951527344779ca296442902ebbe`
        );
        if (!response.ok) throw new Error("Errore nel recupero dati");
        const json = await response.json();
        setGame(json);
      } catch (error) {
        console.error("Errore:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=2604a951527344779ca296442902ebbe`
        );
        if (!response.ok)
          throw new Error("Errore nel recupero degli screenshot");
        const json = await response.json();
        setScreenshots(json.results || []);
      } catch (error) {
        console.error("Errore nel recupero screenshot:", error);
      }
    };
    fetchScreenshots();
  }, [id]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("reviews, created_at, profile_id")
      .eq("game_id", game.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setReviews(data);
    }
  };

  useEffect(() => {
    if (game) {
      fetchReviews();
    }
  }, [game]);

  const addToFav = async () => {
    if (!session) {
      toast.error("Devi essere loggato per aggiungere ai preferiti!");
      return;
    }

    try {
      const { error } = await supabase.from("favourites").insert([
        {
          profile_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ]);

      if (error) {
        console.error(error);
        toast.error(error.message);
      } else {
        setFav(true);
        toast.success("Game added to favourites!");
      }
    } catch (err) {
      console.error("Errore:", err);
      toast.error("Errore durante l'aggiunta ai preferiti.");
    }
  };

  const removeFav = async () => {
    if (!session) {
      toast.error("Devi essere loggato per rimuovere dai preferiti!");
      return;
    }

    try {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .match({ profile_id: session.user.id, game_id: game.id });

      if (error) {
        console.error(error);
        toast.error(error.message);
      } else {
        setFav(false);
        toast.success("Game removed from favourites!");
      }
    } catch (err) {
      console.error("Errore:", err);
      toast.error("Errore durante la rimozione dai preferiti.");
    }
  };

  useEffect(() => {
    if (session) {
      supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", session.user.id)
        .eq("game_id", id)
        .then(({ data, error }) => {
          if (error) toast.error(error.message);
          else setFav(data.length > 0);
        });
    }
  }, [session, id]);

  const submitReview = async () => {
    if (!session) {
      toast.error("Devi essere loggato per scrivere una recensione!");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("La recensione non può essere vuota!");
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          profile_id: session.user.id,
          game_id: game.id,
          reviews: reviewText,
        },
      ]);

      if (error) {
        console.error(error);
        toast.error("Errore durante l'invio della recensione.");
      } else {
        toast.success("Recensione inviata con successo!");
        setReviewText("");
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
      toast.error("Errore durante l'invio della recensione.");
    }
  };

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid custom_margin_top white-1">
      <div className="game-details-container">
        <div className="game-content">
          {game.background_image && (
            <img
              className="cover-image"
              src={game.background_image}
              alt={game.name}
            />
          )}

          <div className="screenshots-container">
            {screenshots.slice(0, 4).map((shot, index) => (
              <div key={index} className="screenshot-wrapper">
                <img
                  src={shot.image}
                  alt={`Screenshot ${index + 1}`}
                  className="screenshot"
                />
              </div>
            ))}

            <div className="game-details">
              <p className="rating-text">
                Rating: <i className="bi bi-star-fill me-1"></i>
                {game.rating}/{game.rating_top}
              </p>
              <p className="release-text">Released: {game.released}</p>
              <p className="genres-text">
                Genres:{" "}
                {game.genres
                  ? game.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </p>
              <p className="platforms-text">
                Platforms:{" "}
                {game.platforms
                  ? game.platforms.map((p) => p.platform.name).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="game-info">
          <h1>{game.name}</h1>
          <p>{game.description_raw}</p>

          {session && (
            <>
              {fav ? (
                <button onClick={removeFav} className="remove-button-game">
                  Remove from favourites
                </button>
              ) : (
                <button onClick={addToFav} className="add-button-game">
                  Add to favourites
                </button>
              )}

              <div className="row justify-content-center align-items-center">
                <div className="col-5">
                  <Chat game={game} session={session} />
                </div>

                <ReviewSection
                  gameId={game.id}
                  gameName={game.name}
                  gameImage={game.background_image}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}
