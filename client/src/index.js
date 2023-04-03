import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Ranking from "./Ranking";
import LeagueInput from "./LeagueInput";
import Leagues from "./Leagues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Leagues />,
  },
  {
    path: "/add",
    element: <LeagueInput />,
  },
  {
    path: "/:leagueId",
    element: <Ranking />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
