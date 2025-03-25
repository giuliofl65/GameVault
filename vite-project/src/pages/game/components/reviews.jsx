import React, { useEffect, useState } from "react";
import supabase from "../../../supabase/client";

const ReviewsSection = ({ gameId, gameName, gameImage }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!gameId) {
        console.error("Game ID is missing.");
        return;
      }

      console.log("Fetching reviews for gameId:", gameId);

      const { data: reviewsData, error } = await supabase
        .from("reviews")
        .select("id, profile_id, reviews")
        .eq("game_id", gameId)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        const enrichedReviews = await Promise.all(
          reviewsData.map(async (review) => {
            const { data: userProfile, error: userError } = await supabase
              .from("profiles")
              .select("username")
              .eq("id", review.profile_id)
              .single();

            if (userError) {
              console.error("Error fetching username:", userError);
            }

            return {
              ...review,
              username: userProfile ? userProfile.username : "Anonimo",
            };
          })
        );

        setReviews(enrichedReviews);
      }
    };

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchReviews();
    fetchUser();
  }, [gameId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit clicked");

    if (!comment.trim()) {
      console.log("Comment is empty");
      return;
    }

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    if (!gameId || !gameName || !gameImage) {
      console.error("Game ID, name, or image is missing.");
      return;
    }

    console.log("Sending review...");

    // Inseriamo anche il nome e l'immagine del gioco nella recensione
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          profile_id: userId,
          reviews: comment,
          game_id: gameId,
          game_name: gameName, // Salviamo il nome del gioco
          game_image: gameImage, // Salviamo l'immagine del gioco
        },
      ])
      .select();

    if (error) {
      console.error("Error submitting review:", error);
      return;
    }

    console.log("Review submitted successfully", data);

    if (!data || data.length === 0) {
      console.error("No data returned from Supabase");
      return;
    }

    // Aggiungi la recensione appena inviata alla lista delle recensioni
    setReviews([
      { id: data[0].id, profile_id: userId, reviews: comment, username: "Tu" },
      ...reviews,
    ]);
    setComment(""); // Reset del campo del commento
  };

  return (
    <>
      <div className="col-5 bg-light-dark-1 p-4 rounded game_reviews">
        <h3 className="white-1">Lascia una recensione</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-100 p-2 bg-dark-grey-1 white-1 rounded border-0"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Scrivi la tua recensione..."
            rows="4"
          />
          <button type="submit" className="button primary mt-2">
            Invia Recensione
          </button>
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
            <h4 className="white-1">Ultime recensioni:</h4>
            <div className="reviews-container">
              <ul className="list-unstyled">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="bg-dark-grey-1 white-1 p-2 mt-2 rounded"
                  >
                    <strong>{review.username}:</strong> {review.reviews}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsSection;
