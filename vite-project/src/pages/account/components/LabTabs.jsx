import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/sessionContext";
import ProfileAccount from "./ProfileAccount";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { session } = useContext(SessionContext);
  const [value, setValue] = useState(0);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [userReviews, setUserReviews] = useState([]);


  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", session.user.id);

      if (!error) setFavoriteGames(data);
    };

    fetchFavorites();
  }, [session]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("reviews")
        .select("id, game_id, reviews, created_at, game_name, game_image")
        .eq("profile_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!error) setUserReviews(data);
    };

    fetchReviews();
  }, [session]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            "& .MuiTab-root": {
              color: "white",
              fontSize: isMobile ? "12px" : "16px",
              minWidth: isMobile ? "80px" : "120px",
              padding: isMobile ? "6px" : "12px",
            },
            "& .Mui-selected": { color: "white" },
            "& .MuiTabs-indicator": { backgroundColor: "var(--light-grey)" },
          }}
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Favourites" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <ProfileAccount />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <h2 className="tab-title">Favourite Games</h2>
        {favoriteGames.length > 0 ? (
          <div className="game-fav-cards">
            {favoriteGames.map((game) => (
              <div key={game.game_id} className="game-fav-card">
                {game.game_image && (
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    className="fav-game-image"
                  />
                )}
                <h3 className="fav-game-name">{game.game_name}</h3>
                <p className="fav-game-date">
                  Added on {new Date(game.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No favourite games yet.</p>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <h2 className="tab-title">Reviews</h2>
        {userReviews.length > 0 ? (
          <div className="reviews-list">
            {userReviews.map((review) => (
              <div key={review.id} className="review-card">
                <img
                  src={review.game_image}
                  alt={review.game_name}
                  className="review-game-image"
                />
                <h3 className="review-game-name">{review.game_name}</h3>
                <p>{review.reviews}</p>
                <p className="review-date">
                  Reviewed on {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </CustomTabPanel>
    </Box>
  );
}
