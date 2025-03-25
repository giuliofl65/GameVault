
import { Link } from "react-router";
import GenresSideBar from "./genresSideBar";
import PlatformSideBar from "./platformsSideBar";


export default function Sidebar() {
  return (
    <div>
      <div className="sidenav mt-5 pt-4 d-none d-md-block">
        <Link to="/" className="white-1 side-link mt-5">
          Home
        </Link>
        <h3 className="white-1 mt-4">
          <i className="fa-solid fa-dice me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
          Genres
        </h3>
        <GenresSideBar />
        <h3 className="white-1 mt-5">
          <i className="fa-solid fa-gamepad me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
          Platforms
        </h3>
        <PlatformSideBar />
      </div>


    </div>
  );
}
