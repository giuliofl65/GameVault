import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/sidebar";
import NavBar from "../components/navbar/NavBar";


export default function Markup({ }) {
    return (
        <>
            <div className="container-fluid">
                <NavBar />
                <div className="d-flex">
                <Sidebar />
                <Outlet />
                </div>
            </div>
        </>
    )
}