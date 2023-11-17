import React from "react";
import ReactDOM from "react-dom/client";
import AppTemp from "./AppTemp.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ugly way to set the base path
const router = createBrowserRouter([
  {
    path: "/wzc3" + "/",
    element: <AppTemp />,
  },
  {
    path: "/wzc3" + "/test",
    element: <div>Test</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
