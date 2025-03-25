
// import { useState } from "react";
// import GenresSideBar from "./genresSideBar";
// import PlatformSideBar from "./platformsSideBar";

// export default function MenuMobile() {
//   const [showOffcanvas, setShowOffcanvas] = useState(false);

//   const toggleOffcanvas = () => {
//     setShowOffcanvas(!showOffcanvas);
//   };

//   return (
//     <div className="d-md-none">
//       <button
//         className="btn bg-medium-grey-1 text-white w-100"
//         type="button"
//         onClick={toggleOffcanvas}
//       >
//         Menu {/* Solo la scritta senza l'icona */}
//       </button>

//       {/* Offcanvas content */}
//       <div
//         className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
//         tabIndex="-1"
//         id="mobileOffcanvas"
//         aria-labelledby="mobileOffcanvasLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="mobileOffcanvasLabel">
//             Menu
//           </h5>
//           <button
//             type="button"
//             className="btn-close text-reset"
//             onClick={toggleOffcanvas}
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body bg-dark-grey-1">
//           <div>
//             <h3 className="white-1 mt-4">
//               <i className="fa-solid fa-dice me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
//               Genres
//             </h3>
//             <GenresSideBar />
//           </div>
//           <div className="mt-5">
//             <h3 className="white-1 mt-4">
//               <i className="fa-solid fa-gamepad me-2 white-1 bg-medium-grey-1 rounded p-1"></i>
//               Platforms
//             </h3>
//             <PlatformSideBar />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
