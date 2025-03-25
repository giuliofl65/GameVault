import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import SearchForm from "./searchForm/searchForm";
import supabase from "../../supabase/client";
import SessionContext from "../../context/sessionContext";
import { toast, Toaster } from "sonner";
import GenresSideBar from "../sidebar/genresSideBar";
import PlatformSideBar from "../sidebar/platformsSideBar";

export default function NavBar() {
  const { session } = useContext(SessionContext);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (session) {
        const { user } = session;
        const { data, error } = await supabase
          .from("profiles")
          .select(`username, avatar_url`)
          .eq("id", user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            setUsername(data.username);
            setAvatarUrl(data.avatar_url);
          }
        }
      }
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUsername("guest");
    setAvatarUrl("default-avatar.png");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (query) => {
    if (!query) return;
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  // Funzione per chiudere l'Offcanvas
  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light-dark-1 bg-transparent d-flex align-items-center fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center mx-auto w-100">
            <Link to="/" className="navbar-brand">
              ReHacktor
            </Link>
            <SearchForm onSubmit={handleSearchSubmit} />

            {/* Profilo visibile solo su Desktop */}
            <div className="d-none d-lg-flex align-items-center ms-auto">
              <img
                className="rounded-circle custom-logo-img me-2"
                alt="avatar"
                src={
                  avatar_url
                    ? `https://rpsnvbiinzrevtxeiozz.supabase.co/storage/v1/object/public/avatars/${avatar_url}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                style={{ width: "40px", height: "40px" }}
              />
              <span className="text-white">{session ? username : "guest"}</span>

              {session ? (
                <>
                  <Link
                    to="/account"
                    className="btn button primary text-white ms-2"
                  >
                    Account
                  </Link>
                  <button className="btn button primary ms-2" onClick={signOut}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn button primary ms-2 custom-button"
                    onClick={closeOffcanvas}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn button primary ms-2 custom-button"
                    onClick={closeOffcanvas}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Bottone OffCanvas visibile solo su Mobile */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleOffcanvas}
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list white-1 fs-3"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* OffCanvas visibile solo su Mobile */}
      <div
        className={`offcanvas offcanvas-start bg-dark-grey-1 ${
          showOffcanvas ? "show" : ""
        }`}
        tabIndex="-1"
        id="mobileOffcanvas"
        aria-labelledby="mobileOffcanvasLabel"
      >
        <div className="offcanvas-header d-flex justify-content-end">
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleOffcanvas}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body text-center" onClick={closeOffcanvas}>
          {/* Profilo visibile solo su Mobile */}
          <div className="profile-section mb-4 d-lg-none">
            <img
              className="rounded-circle custom-logo-img mb-2"
              alt="avatar"
              src={
                avatar_url
                  ? `https://rpsnvbiinzrevtxeiozz.supabase.co/storage/v1/object/public/avatars/${avatar_url}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              style={{ width: "80px", height: "80px" }}
            />
            <h6 className="text-white">{session ? username : "guest"}</h6>

            {session ? (
              <>
                <Link to="/account" className="btn button primary mt-2 me-2">
                  Account
                </Link>
                <button
                  className="btn button primary mt-2"
                  onClick={signOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signIn" className="btn button primary mt-2 me-2">
                  Sign In
                </Link>
                <Link to="/signUp" className="btn button primary mt-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Sezione per i generi */}
          <div>
            <h3 className="white-1 mt-4">
              <i className="fa-solid fa-dice me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
              Genres
            </h3>
            <GenresSideBar />
          </div>

          {/* Sezione per le piattaforme */}
          <div className="mt-4">
            <h3 className="white-1 mt-4">
              <i className="fa-solid fa-gamepad me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
              Platforms
            </h3>
            <PlatformSideBar />
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}
