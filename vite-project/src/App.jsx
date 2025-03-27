import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router";
import Home from "./pages/home/home";
import Game from "./pages/game/game";
import Genre from "./pages/genre/genre";
import Platforms from "./pages/platforms/platforms";
import SearchGame from "./pages/searchGames/searchgame";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Account from "./pages/account/account";
import Markup from "./layout";
import { useContext } from "react";
import SessionContextProvider from "./context/sessionContextProvider";
import SessionContext from "./context/sessionContext";
import { PulseLoader } from "react-spinners";


function ProtectedRoute() {
  const {session, loading} = useContext(SessionContext);
  if(loading) {
    return <PulseLoader color="#ffffff" />;
  }
  if (!session) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Markup />}>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id/:game" element={<Game />} />
            <Route path="/genre/:genreId" element={<Genre />} />
            <Route path="/platform/:platformId" element={<Platforms />} />
            <Route path="/search" element={<SearchGame />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
            </Route>
        </Route>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
  )
}
function Root() {
  return (
  <SessionContextProvider>
    <App />
  </SessionContextProvider>
)
}

export default Root
